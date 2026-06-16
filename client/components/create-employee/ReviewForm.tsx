import { useMutation } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';
import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { EmployeeSignupData } from './createEmployeeSchemas';
import { employeeSignup } from './EmployeeSIgnup';

const ReviewForm = () => {
  const stepper = employeeSignup.useStepper();
  const router = useRouter();
  const employeeCreation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/admin/create-employee`,
        {
          method: 'POST',
          credentials: 'include',
          body: formData,
        },
      );
      if (!response.ok) {
        const message =
          (await response.text()) || `Request failed: ${response.status}`;

        throw new Error(message);
      }

      return response;
    },
    onSuccess(data) {
      if (data.status === 400) {
        toast.error(
          'Failed to create employee. Please check the data and try again.',
        );
        return;
      }
      toast.success('Employee created successfully');
      stepper.reset().finally(() => {
        router.push('employees');
      });
    },

    onError(error) {
      toast.error(error.message || 'Failed to create employee');
    },
  });
  const stepperData = stepper.data.all();

  const personalInfo = stepper.data.get('1');
  const personalData = Object.entries(personalInfo || {}).map(
    ([key, value]) => {
      return {
        label: key,
        value,
      };
    },
  );
  console.log('Personal Data:', personalData);

  const employmentInfo = stepper.data.get('2');
  const employmentData = Object.entries(employmentInfo || {}).map(
    ([key, value]) => {
      return {
        label: key,
        value,
      };
    },
  );
  console.log('Employment Data:', employmentData);

  const documentInfo = stepper.data.get('3');
  const documentData = Object.entries(documentInfo || {}).map(
    ([key, value]) => {
      return {
        label: key,
        value,
      };
    },
  );
  console.log('Document Data:', documentData);

  // 1. Extract the inner objects and flatten them into one
  const employeeData: EmployeeSignupData = Object.assign(
    {},
    ...Object.values(stepperData),
  );

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append(
      'name',
      employeeData.firstname +
        ' ' +
        employeeData.middlename +
        ' ' +
        employeeData.lastname,
    );
    formData.append('email', employeeData.email);

    formData.append('dob', employeeData.dob.toISOString());
    formData.append('gender', employeeData.gender);
    formData.append('contact', employeeData.contact);
    formData.append('emergencyContact', employeeData.emergencyContact);
    formData.append(
      'emergencyContactRelation',
      employeeData.emergencyContactRelation,
    );
    formData.append('emergencyContactName', employeeData.emergencyContactName);
    formData.append('bloodGroup', employeeData.bloodGroup || '');
    formData.append('address', employeeData.address);

    formData.append('employmentType', employeeData.employmentType);
    formData.append('department', employeeData.department);
    formData.append('dateOfJoining', employeeData.dateOfJoining.toISOString());
    formData.append(
      'employmentStartDate',
      employeeData.employmentStartDate.toISOString(),
    );
    formData.append('employmentStartAs', employeeData.employmentStartAs);
    formData.append('employeeStatus', employeeData.employeeStatus);
    formData.append('salary', employeeData.salary.toString());
    formData.append('bankAccount', employeeData.bankAccount);
    formData.append('bankName', employeeData.bankName);

    formData.append('panNumber', employeeData.panNumber);
    formData.append('citizenshipNumber', employeeData.citizenshipNumber);

    //photo appen profile photo, panphoto,citizenshipbackphoto,citizenshipfrontphoto
    if (employeeData.profilePhoto) {
      formData.append('profilePhoto', employeeData.profilePhoto);
    }
    if (employeeData.panPhoto) {
      formData.append('panPhoto', employeeData.panPhoto);
    }
    if (employeeData.citizenshipFrontPhoto) {
      formData.append(
        'citizenshipFrontPhoto',
        employeeData.citizenshipFrontPhoto,
      );
    }
    if (employeeData.citizenshipBackPhoto) {
      formData.append(
        'citizenshipBackPhoto',
        employeeData.citizenshipBackPhoto,
      );
    }

    if (employeeData.github) {
      formData.append('github', employeeData.github);
    }

    if (
      employeeData.employmentType === 'intern' &&
      employeeData.internshipDurationMonths
    ) {
      formData.append(
        'internshipDurationMonths',
        employeeData.internshipDurationMonths.toString(),
      );
    }

    employeeCreation.mutate(formData);
  };

  console.log(employeeData);
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Review & Submit</h2>
        <p className="text-sm text-muted-foreground">
          Please review all the information before submitting.
        </p>
      </div>

      {/* Profile Preview */}
      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar className="h-20 w-20 ring-4 ring-primary/20">
              <AvatarImage src={employeeData.profilePhoto} />
              <AvatarFallback className="text-xl bg-primary/10 text-primary font-bold">
                {employeeData.firstname?.charAt(0)}
                {employeeData.lastname?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold">
                {employeeData.firstname} {employeeData.middlename}{' '}
                {employeeData.lastname}
              </h3>
              <p className="text-muted-foreground">{employeeData.department}</p>
              <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                <Badge variant="outline" className={'bg-blue-50 text-blue-700'}>
                  New Employee
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {employeeData.employmentType}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {personalData.map((item, index) => {
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">
                      {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                    </p>
                    <p className="text-sm font-medium truncate">
                      {item.value ? item.value.toString() : '-'}
                    </p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Employment Information */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Employment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {employmentData.map((item, index) => {
              return (
                <div
                  key={index + item.label}
                  className="flex items-center gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">
                      {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                    </p>
                    <p className="text-sm font-medium truncate">
                      {item.value ? item.value.toString() : '-'}
                    </p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Documents */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 mb-4">
            <PhotoProvider>
              {documentData.map((item, index) => {
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {item.label.charAt(0).toUpperCase() +
                          item.label.slice(1)}
                      </p>
                      {item.value instanceof File ? (
                        <PhotoView
                          key={index}
                          src={URL.createObjectURL(item.value)}
                        >
                          <img
                            className="w-40 h-40 object-cover rounded-lg border cursor-zoom-in transition-opacity hover:opacity-90"
                            src={URL.createObjectURL(item.value)}
                            alt={item.label}
                          />
                        </PhotoView>
                      ) : (
                        <p className="text-sm font-medium">
                          {item.value ?? '-'}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </PhotoProvider>
          </div>
        </CardContent>
      </Card>

      {/* Note */}
      <Card className={'bg-amber-50 border-amber-200'}>
        <CardContent className="py-4">
          <p className={`text-sm text-amber-800`}>
            <strong>Note:</strong> A temporary password will be generated and
            sent to the employee&apos;s email address. They will be required to
            change it upon first login.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={async () => {
            await stepper.goTo('3');
          }}
          disabled={employeeCreation.isPending}
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={employeeCreation.isPending}
          className="dark:text-white"
        >
          Submit Application
        </Button>
      </div>

      {/* Lightbox */}
      {/* <ImageLightbox
        open={preview.open}
        onOpenChange={(open) => setPreview((prev) => ({ ...prev, open }))}
        src={preview.src}
        alt={preview.label}
      /> */}
    </div>
  );
};

export default ReviewForm;
