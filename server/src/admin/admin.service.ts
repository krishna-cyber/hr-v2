import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from '@thallesp/nestjs-better-auth';
import generatePassword from 'generate-password';
import mongoose, { Model } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
import { CreateEmployeeFiles, Role } from 'types/types';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './schemas/employee.schema';
import { User } from './schemas/user.schema';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Employee.name) private readonly employeeModel: Model<Employee>,
    private readonly authService: AuthService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  // creates a new employee
  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
    files: CreateEmployeeFiles,
  ) {
    try {
      const [existingUser, hrExist] = await Promise.all([
        this.userModel.findOne({ email: createEmployeeDto.email }),
        this.userModel.findOne({ role: Role.hr }),
      ]);

      // Check for existing user by email
      if (existingUser) {
        throw new BadRequestException('User with this email already exists');
      }

      // Check for HR duplication
      if (createEmployeeDto.role === 'hr' && hrExist) {
        throw new BadRequestException(
          'HR already exists. Only one HR is allowed.',
        );
      }

      const employee = await new this.employeeModel({
        dob: createEmployeeDto.dob,
        gender: createEmployeeDto.gender,
        contact: createEmployeeDto.contact,
        emergencyContact: createEmployeeDto.emergencyContact,
        emergencyContactRelation: createEmployeeDto.emergencyContactRelation,
        emergencyContactName: createEmployeeDto.emergencyContactName,
        bloodGroup: createEmployeeDto.bloodGroup,
        address: createEmployeeDto.address,
        employmentType: createEmployeeDto.employmentType,
        department: createEmployeeDto.department,
        dateOfJoining: createEmployeeDto.dateOfJoining,
        employmentStartDate: createEmployeeDto.employmentStartDate,
        employmentStartAs: createEmployeeDto.employmentStartAs,
        employeeStatus: createEmployeeDto.employeeStatus,
        salary: createEmployeeDto.salary,
        bankAccount: createEmployeeDto.bankAccount,
        bankName: createEmployeeDto.bankName,
        panNumber: createEmployeeDto.panNumber,
        citizenshipNumber: createEmployeeDto.citizenshipNumber,

        //if these files are present, add their paths to the employee document
        ...(files.citizenshipFrontPhoto && {
          citizenshipFrontPhoto: files.citizenshipFrontPhoto[0].path,
        }),
        ...(files.citizenshipBackPhoto && {
          citizenshipBackPhoto: files.citizenshipBackPhoto[0].path,
        }),
        ...(files.panPhoto && { panPhoto: files.panPhoto[0].path }),
        ...(files.profilePhoto && {
          profilePhoto: files.profilePhoto[0].path,
        }),
        ...(files.signaturePhoto && {
          signaturePhoto: files.signaturePhoto[0].path,
        }),
        ...(createEmployeeDto.github && { github: createEmployeeDto.github }),
        internshipDurationMonths: createEmployeeDto.internshipDurationMonths,
      }).save();

      const generatedPassword = generatePassword.generate({
        length: 10,
        numbers: true,
        symbols: true,
      });

      const user = await this.authService.api.signUpEmail({
        body: {
          email: createEmployeeDto.email,
          password: generatedPassword,
          name: createEmployeeDto.name,
          image: '',
        },
      });

      await this.userModel.findByIdAndUpdate(
        new mongoose.Types.ObjectId(user.user.id),
        {
          employeeId: employee._id,
          role: createEmployeeDto.role,
        },
      );

      await this.mailService.sendWelcomeEmail(createEmployeeDto.email, {
        firstName: createEmployeeDto.name,
        email: createEmployeeDto.email,
        password: generatedPassword,
        loginUrl: `${this.configService.get('CLIENT_URL')}/login`,
      });

      return {
        success: true,
        message: 'Employee created successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error('Failed to create employee', error);
      throw new InternalServerErrorException('Failed to create employee', {
        cause: error,
      });
    }
  }

  //completed
  async updateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      await this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto, {
        new: true,
      });

      return {
        success: true,
        message: 'Employee updated successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error('Failed to update employee', error);
      throw new InternalServerErrorException('Failed to update employee', {
        cause: error,
      });
    }
  }

  async getDashboardStats(user: User) {
    //get supervisor cound, get leave stats, get employeestats, get user stats, get recent activity
    const [superVisorCount, employeeStats] = await Promise.all([
      this.userModel.countDocuments({
        role: { $in: [Role.admin, Role.hr] },
        emailVerified: true,
      }),

      this.employeeModel.aggregate([
        {
          $group: {
            _id: '$employeeStatus',
            count: { $sum: 1 },
          },
        },
      ]),
      // this.employeeModel.countDocuments({ employeeStatus: 'active' }),
    ]);

    return 'This action returns dashboard stats';
  }

  getEmployeeSupervisor(userId: number) {
    return `This action returns the supervisor of employee with id ${userId}`;
  }

  promoteToSupervisor(userId: number) {
    return `This action promotes employee with id ${userId} to supervisor`;
  }

  demoteFromSupervisor(userId: number) {
    return `This action demotes employee with id ${userId} from supervisor`;
  }

  terminateEmployee(userId: number) {
    return `This action terminates employee with id ${userId}`;
  }

  removeSupervisor(userId: number) {
    return `This action removes supervisor from employee with id ${userId}`;
  }

  async getUpcomingBirthdays() {
    try {
      const today = new Date();

      const dates = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        return {
          month: d.getMonth() + 1,
          day: d.getDate(),
        };
      });

      const employees = await this.employeeModel
        .find({
          $expr: {
            $or: dates.map(({ month, day }) => ({
              $and: [
                { $eq: [{ $month: '$dob' }, month] },
                { $eq: [{ $dayOfMonth: '$dob' }, day] },
              ],
            })),
          },
        })
        .select('department dob');

      const employeeIds = employees.map((emp) => String(emp._id));

      const users = await this.userModel.find({
        employeeId: { $in: employeeIds },
      });

      //Transformed data and sorting by date of birth
      const transFormedData = users
        .map((user) => ({
          name: user.name,
          _id: user._id,
          avatar: user?.image || '',
          department: employees.find(
            (emp) => String(emp._id) === String(user.employeeId),
          )?.department,
          dob: employees.find(
            (emp) => String(emp._id) === String(user.employeeId),
          )?.dob,
        }))
        .sort((a, b) => {
          const dateA = new Date(a.dob ?? 0);
          const dateB = new Date(b.dob ?? 0);
          return dateA.getTime() - dateB.getTime();
        });

      return {
        success: true,
        data: transFormedData || [],
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error('Failed to get upcoming birthdays', error);
      throw new InternalServerErrorException('Failed to create employee', {
        cause: error,
      });
    }
  }

  findAll() {
    return `This action returns all employees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
