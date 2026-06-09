import { UpcommingBirthday } from '@/types/types';
import dayjs from 'dayjs';
import { Cake } from 'lucide-react';
import { headers } from 'next/headers';
import React from 'react';

export const upcomingBirthdays: UpcommingBirthday[] = [
  {
    id: 'EMP001',
    name: 'Krishna Tiwari',
    birthday: '2026-06-12',
    department: 'Engineering',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 'EMP002',
    name: 'Aarav Sharma',
    birthday: '2026-06-15',
    department: 'Human Resources',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 'EMP003',
    name: 'Priya Karki',
    birthday: '2026-06-18',
    department: 'Finance',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 'EMP004',
    name: 'Sanjay Thapa',
    birthday: '2026-06-22',
    department: 'Marketing',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: 'EMP005',
    name: 'Anisha Gurung',
    birthday: '2026-06-25',
    department: 'Operations',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 'EMP006',
    name: 'Rohan Adhikari',
    birthday: '2026-06-28',
    department: 'Engineering',
    avatar: 'https://i.pravatar.cc/150?img=6',
  },
  {
    id: 'EMP007',
    name: 'Sneha Joshi',
    birthday: '2026-07-01',
    department: 'Sales',
    avatar: 'https://i.pravatar.cc/150?img=7',
  },
  {
    id: 'EMP008',
    name: 'Bikash Rai',
    birthday: '2026-07-04',
    department: 'Customer Support',
    avatar: 'https://i.pravatar.cc/150?img=8',
  },
];

const BirthdayCard = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/admin/dashboard/birthdays`,
    {
      headers: await headers(),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch birthday data');
  }
  const data = (await response.json()) as {
    success: boolean;
    data: UpcommingBirthday[];
  };

  const birthdayData = data.data;

  return (
    <div className="w-full bg-white rounded-lg shadow-md border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Cake className="w-5 h-5 text-rose-500" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Upcoming Birthdays
            </h2>
          </div>
        </div>
        <span className="text-xs text-gray-500">
          {/* {sortedEmployees.length} upcoming */}
          10
        </span>
      </div>

      {/* List */}
      <div className="max-h-80 overflow-y-auto">
        {birthdayData.length === 0 ? (
          <p className="text-center text-sm text-gray-400 py-10">
            No upcoming birthdays found.
          </p>
        ) : (
          birthdayData.map((employee) => {
            const isToday = dayjs(employee.birthday).isSame(dayjs(), 'day');
            const isTomorrow = dayjs(employee.birthday).isSame(
              dayjs().add(1, 'day'),
              'day',
            );
            return (
              <div
                key={employee.id}
                className={`flex items-center gap-3 p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                  isToday ? 'bg-rose-50' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white shrink-0 ${
                    isToday
                      ? 'bg-linear-to-br from-rose-400 to-pink-500'
                      : 'bg-linear-to-br from-blue-400 to-indigo-500'
                  }`}
                >
                  AV
                  {employee.avatar || employee.name.slice(0, 2).toUpperCase()}
                </div>

                {/* Name + Dept */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {employee.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {employee.department}
                  </p>
                </div>

                {/* BS Date + Countdown */}
                <div className="text-right shrink-0">
                  <p className="text-xs font-semibold text-gray-700">
                    {dayjs(employee.birthday).format('MMM')}{' '}
                    {dayjs(employee.birthday).date()}
                  </p>
                  <p
                    className={`text-xs font-semibold mt-0.5 ${
                      isToday
                        ? 'text-rose-600'
                        : isTomorrow
                          ? 'text-green-700'
                          : 'text-gray-500'
                    }`}
                  >
                    {isToday
                      ? '🎉 Today'
                      : isTomorrow
                        ? 'Tomorrow'
                        : `in ${dayjs(employee.birthday).diff(dayjs(), 'day')} days`}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BirthdayCard;
