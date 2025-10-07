import { FieldConfig } from "@/components/form/field-config";

export const userConfig: FieldConfig[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'input',
    placeholder: 'Enter email address',
    required: true,
    colSpan: 2
  },
  {
    name: 'passwordHash',
    label: 'Password',
    type: 'input',
    placeholder: 'Enter password',
    required: true,
    colSpan: 2
  },
  {
    name: 'role',
    label: 'Role',
    type: 'select',
    required: true,
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'Teacher', value: 'teacher' },
      { label: 'Student', value: 'student' },
      { label: 'Parent', value: 'parent' },
      { label: 'Bursary', value: 'bursary' },
      { label: 'Staff', value: 'staff' }
    ],
    colSpan: 2
  },
  {
    name: 'isActive',
    label: 'Active Status',
    type: 'checkbox',
    colSpan: 1
  },
  {
    name: 'twoFactorEnabled',
    label: 'Two-Factor Authentication',
    type: 'checkbox',
    colSpan: 1
  }
];

export const studentConfig: FieldConfig[] = [
  {
    name: 'admissionNumber',
    label: 'Admission Number',
    type: 'input',
    placeholder: 'Enter admission number',
    required: true,
    colSpan: 2
  },
  {
    name: 'firstName',
    label: 'First Name',
    type: 'input',
    placeholder: 'Enter first name',
    required: true,
    colSpan: 2
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'input',
    placeholder: 'Enter last name',
    required: true,
    colSpan: 2
  },
  {
    name: 'middleName',
    label: 'Middle Name',
    type: 'input',
    placeholder: 'Enter middle name',
    colSpan: 2
  },
  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'gender',
    label: 'Gender',
    type: 'select',
    required: true,
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Other', value: 'other' }
    ],
    colSpan: 2
  },
  {
    name: 'bloodGroup',
    label: 'Blood Group',
    type: 'select',
    options: [
      { label: 'A+', value: 'A+' },
      { label: 'A-', value: 'A-' },
      { label: 'B+', value: 'B+' },
      { label: 'B-', value: 'B-' },
      { label: 'AB+', value: 'AB+' },
      { label: 'AB-', value: 'AB-' },
      { label: 'O+', value: 'O+' },
      { label: 'O-', value: 'O-' }
    ],
    colSpan: 2
  },
  {
    name: 'email',
    label: 'Email',
    type: 'input',
    placeholder: 'Enter email address',
    colSpan: 2
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'input',
    placeholder: 'Enter phone number',
    colSpan: 2
  },
  {
    name: 'address',
    label: 'Address',
    type: 'textarea',
    placeholder: 'Enter complete address',
    colSpan: 4
  },
  {
    name: 'nationality',
    label: 'Nationality',
    type: 'input',
    placeholder: 'Enter nationality',
    colSpan: 2
  },
  {
    name: 'religion',
    label: 'Religion',
    type: 'input',
    placeholder: 'Enter religion',
    colSpan: 2
  },
  {
    name: 'category',
    label: 'Category',
    type: 'input',
    placeholder: 'Enter category',
    colSpan: 2
  },
  {
    name: 'admissionDate',
    label: 'Admission Date',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'previousSchool',
    label: 'Previous School',
    type: 'input',
    placeholder: 'Enter previous school name',
    colSpan: 2
  },
  {
    name: 'specialNeeds',
    label: 'Special Needs',
    type: 'textarea',
    placeholder: 'Enter any special needs or requirements',
    colSpan: 4
  },
  {
    name: 'isActive',
    label: 'Active Status',
    type: 'checkbox',
    colSpan: 1
  }
];

export const staffConfig: FieldConfig[] = [
  {
    name: 'employeeId',
    label: 'Employee ID',
    type: 'input',
    placeholder: 'Enter employee ID',
    required: true,
    colSpan: 2
  },
  {
    name: 'firstName',
    label: 'First Name',
    type: 'input',
    placeholder: 'Enter first name',
    required: true,
    colSpan: 2
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'input',
    placeholder: 'Enter last name',
    required: true,
    colSpan: 2
  },
  {
    name: 'middleName',
    label: 'Middle Name',
    type: 'input',
    placeholder: 'Enter middle name',
    colSpan: 2
  },
  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'gender',
    label: 'Gender',
    type: 'select',
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Other', value: 'other' }
    ],
    colSpan: 2
  },
  {
    name: 'staffType',
    label: 'Staff Type',
    type: 'select',
    required: true,
    options: [
      { label: 'Teaching', value: 'teaching' },
      { label: 'Non-Teaching', value: 'non_teaching' },
      { label: 'Administrative', value: 'administrative' },
      { label: 'Support', value: 'support' }
    ],
    colSpan: 2
  },
  {
    name: 'department',
    label: 'Department',
    type: 'input',
    placeholder: 'Enter department',
    colSpan: 2
  },
  {
    name: 'designation',
    label: 'Designation',
    type: 'input',
    placeholder: 'Enter designation',
    colSpan: 2
  },
  {
    name: 'email',
    label: 'Email',
    type: 'input',
    placeholder: 'Enter email address',
    colSpan: 2
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'input',
    placeholder: 'Enter phone number',
    colSpan: 2
  },
  {
    name: 'alternatePhone',
    label: 'Alternate Phone',
    type: 'input',
    placeholder: 'Enter alternate phone number',
    colSpan: 2
  },
  {
    name: 'address',
    label: 'Address',
    type: 'textarea',
    placeholder: 'Enter complete address',
    colSpan: 4
  },
  {
    name: 'nationalId',
    label: 'National ID',
    type: 'input',
    placeholder: 'Enter national ID number',
    colSpan: 2
  },
  {
    name: 'bloodGroup',
    label: 'Blood Group',
    type: 'select',
    options: [
      { label: 'A+', value: 'A+' },
      { label: 'A-', value: 'A-' },
      { label: 'B+', value: 'B+' },
      { label: 'B-', value: 'B-' },
      { label: 'AB+', value: 'AB+' },
      { label: 'AB-', value: 'AB-' },
      { label: 'O+', value: 'O+' },
      { label: 'O-', value: 'O-' }
    ],
    colSpan: 2
  },
  {
    name: 'maritalStatus',
    label: 'Marital Status',
    type: 'select',
    options: [
      { label: 'Single', value: 'single' },
      { label: 'Married', value: 'married' },
      { label: 'Divorced', value: 'divorced' },
      { label: 'Widowed', value: 'widowed' }
    ],
    colSpan: 2
  },
  {
    name: 'joiningDate',
    label: 'Joining Date',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'leavingDate',
    label: 'Leaving Date',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'salary',
    label: 'Salary',
    type: 'input',
    placeholder: 'Enter salary amount',
    colSpan: 2
  },
  {
    name: 'isActive',
    label: 'Active Status',
    type: 'checkbox',
    colSpan: 1
  }
];

export const classConfig: FieldConfig[] = [
  {
    name: 'name',
    label: 'Class Name',
    type: 'input',
    placeholder: 'e.g., Grade 10A',
    required: true,
    colSpan: 2
  },
  {
    name: 'level',
    label: 'Grade Level',
    type: 'input',
    placeholder: 'e.g., 10',
    required: true,
    colSpan: 1
  },
  {
    name: 'section',
    label: 'Section',
    type: 'input',
    placeholder: 'e.g., A, B, C',
    colSpan: 1
  },
  {
    name: 'capacity',
    label: 'Capacity',
    type: 'input',
    placeholder: 'Enter maximum students',
    colSpan: 1
  },
  {
    name: 'room',
    label: 'Room Number',
    type: 'input',
    placeholder: 'Enter room number',
    colSpan: 1
  },
  {
    name: 'isActive',
    label: 'Active Status',
    type: 'checkbox',
    colSpan: 1
  }
];

export const subjectConfig: FieldConfig[] = [
  {
    name: 'name',
    label: 'Subject Name',
    type: 'input',
    placeholder: 'Enter subject name',
    required: true,
    colSpan: 2
  },
  {
    name: 'code',
    label: 'Subject Code',
    type: 'input',
    placeholder: 'Enter subject code',
    colSpan: 2
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter subject description',
    colSpan: 4
  },
  {
    name: 'credits',
    label: 'Credits',
    type: 'input',
    placeholder: 'Enter credit hours',
    colSpan: 1
  },
  {
    name: 'isCore',
    label: 'Core Subject',
    type: 'checkbox',
    colSpan: 1
  },
  {
    name: 'isActive',
    label: 'Active Status',
    type: 'checkbox',
    colSpan: 1
  }
];

export const parentConfig: FieldConfig[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'input',
    placeholder: 'Enter first name',
    required: true,
    colSpan: 2
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'input',
    placeholder: 'Enter last name',
    required: true,
    colSpan: 2
  },
  {
    name: 'relationship',
    label: 'Relationship',
    type: 'select',
    required: true,
    options: [
      { label: 'Father', value: 'father' },
      { label: 'Mother', value: 'mother' },
      { label: 'Guardian', value: 'guardian' },
      { label: 'Other', value: 'other' }
    ],
    colSpan: 2
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'input',
    placeholder: 'Enter phone number',
    colSpan: 2
  },
  {
    name: 'alternatePhone',
    label: 'Alternate Phone',
    type: 'input',
    placeholder: 'Enter alternate phone',
    colSpan: 2
  },
  {
    name: 'email',
    label: 'Email',
    type: 'input',
    placeholder: 'Enter email address',
    colSpan: 2
  },
  {
    name: 'occupation',
    label: 'Occupation',
    type: 'input',
    placeholder: 'Enter occupation',
    colSpan: 2
  },
  {
    name: 'workAddress',
    label: 'Work Address',
    type: 'textarea',
    placeholder: 'Enter work address',
    colSpan: 4
  },
  {
    name: 'address',
    label: 'Home Address',
    type: 'textarea',
    placeholder: 'Enter home address',
    colSpan: 4
  },
  {
    name: 'nationalId',
    label: 'National ID',
    type: 'input',
    placeholder: 'Enter national ID',
    colSpan: 2
  },
  {
    name: 'annualIncome',
    label: 'Annual Income',
    type: 'input',
    placeholder: 'Enter annual income',
    colSpan: 2
  },
  {
    name: 'education',
    label: 'Education',
    type: 'input',
    placeholder: 'Enter education level',
    colSpan: 2
  },
  {
    name: 'isEmergencyContact',
    label: 'Emergency Contact',
    type: 'checkbox',
    colSpan: 1
  },
  {
    name: 'isPrimaryContact',
    label: 'Primary Contact',
    type: 'checkbox',
    colSpan: 1
  }
];

export const academicYearConfig: FieldConfig[] = [
  {
    name: 'name',
    label: 'Academic Year',
    type: 'input',
    placeholder: 'e.g., 2024-2025',
    required: true,
    colSpan: 2
  },
  {
    name: 'startDate',
    label: 'Start Date',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'endDate',
    label: 'End Date',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'isActive',
    label: 'Set as Active Year',
    type: 'checkbox',
    colSpan: 1
  }
];

export const feeStructureConfig: FieldConfig[] = [
  {
    name: 'name',
    label: 'Fee Name',
    type: 'input',
    placeholder: 'Enter fee name',
    required: true,
    colSpan: 2
  },
  {
    name: 'feeType',
    label: 'Fee Type',
    type: 'select',
    required: true,
    options: [
      { label: 'Tuition', value: 'tuition' },
      { label: 'Hostel', value: 'hostel' },
      { label: 'Transport', value: 'transport' },
      { label: 'Activity', value: 'activity' },
      { label: 'Exam', value: 'exam' },
      { label: 'Library', value: 'library' },
      { label: 'Lab', value: 'lab' },
      { label: 'Other', value: 'other' }
    ],
    colSpan: 2
  },
  {
    name: 'amount',
    label: 'Amount',
    type: 'input',
    placeholder: 'Enter fee amount',
    required: true,
    colSpan: 2
  },
  {
    name: 'dueDate',
    label: 'Due Date',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter fee description',
    colSpan: 4
  },
  {
    name: 'isOptional',
    label: 'Optional Fee',
    type: 'checkbox',
    colSpan: 1
  },
  {
    name: 'isActive',
    label: 'Active Status',
    type: 'checkbox',
    colSpan: 1
  }
];

export const examConfig: FieldConfig[] = [
  {
    name: 'name',
    label: 'Exam Name',
    type: 'input',
    placeholder: 'Enter exam name',
    required: true,
    colSpan: 2
  },
  {
    name: 'type',
    label: 'Exam Type',
    type: 'select',
    required: true,
    options: [
      { label: 'Quiz', value: 'quiz' },
      { label: 'Test', value: 'test' },
      { label: 'Midterm', value: 'midterm' },
      { label: 'Final', value: 'final' },
      { label: 'Assignment', value: 'assignment' },
      { label: 'Project', value: 'project' }
    ],
    colSpan: 2
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter exam description',
    colSpan: 4
  },
  {
    name: 'startDate',
    label: 'Start Date',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'endDate',
    label: 'End Date',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'maxMarks',
    label: 'Maximum Marks',
    type: 'input',
    placeholder: 'Enter maximum marks',
    colSpan: 1
  },
  {
    name: 'passMarks',
    label: 'Passing Marks',
    type: 'input',
    placeholder: 'Enter passing marks',
    colSpan: 1
  },
  {
    name: 'isActive',
    label: 'Active Status',
    type: 'checkbox',
    colSpan: 1
  }
];

export const attendanceConfig: FieldConfig[] = [
  {
    name: 'date',
    label: 'Date',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'status',
    label: 'Attendance Status',
    type: 'select',
    required: true,
    options: [
      { label: 'Present', value: 'present' },
      { label: 'Absent', value: 'absent' },
      { label: 'Late', value: 'late' },
      { label: 'Excused', value: 'excused' }
    ],
    colSpan: 2
  },
  {
    name: 'remarks',
    label: 'Remarks',
    type: 'textarea',
    placeholder: 'Enter any remarks',
    colSpan: 4
  }
];

export const eventConfig: FieldConfig[] = [
  {
    name: 'title',
    label: 'Event Title',
    type: 'input',
    placeholder: 'Enter event title',
    required: true,
    colSpan: 2
  },
  {
    name: 'type',
    label: 'Event Type',
    type: 'select',
    required: true,
    options: [
      { label: 'Academic', value: 'academic' },
      { label: 'Sports', value: 'sports' },
      { label: 'Cultural', value: 'cultural' },
      { label: 'Meeting', value: 'meeting' },
      { label: 'Holiday', value: 'holiday' },
      { label: 'Exam', value: 'exam' }
    ],
    colSpan: 2
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter event description',
    colSpan: 4
  },
  {
    name: 'startDate',
    label: 'Start Date & Time',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'endDate',
    label: 'End Date & Time',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'location',
    label: 'Location',
    type: 'input',
    placeholder: 'Enter event location',
    colSpan: 2
  },
  {
    name: 'organizer',
    label: 'Organizer',
    type: 'input',
    placeholder: 'Enter organizer name',
    colSpan: 2
  },
  {
    name: 'isPublic',
    label: 'Public Event',
    type: 'checkbox',
    colSpan: 1
  },
  {
    name: 'requiresRegistration',
    label: 'Requires Registration',
    type: 'checkbox',
    colSpan: 1
  },
  {
    name: 'maxParticipants',
    label: 'Maximum Participants',
    type: 'input',
    placeholder: 'Enter max participants',
    colSpan: 1
  }
];

export const libraryBookConfig: FieldConfig[] = [
  {
    name: 'isbn',
    label: 'ISBN',
    type: 'input',
    placeholder: 'Enter ISBN number',
    colSpan: 2
  },
  {
    name: 'title',
    label: 'Book Title',
    type: 'input',
    placeholder: 'Enter book title',
    required: true,
    colSpan: 2
  },
  {
    name: 'author',
    label: 'Author',
    type: 'input',
    placeholder: 'Enter author name',
    colSpan: 2
  },
  {
    name: 'publisher',
    label: 'Publisher',
    type: 'input',
    placeholder: 'Enter publisher name',
    colSpan: 2
  },
  {
    name: 'category',
    label: 'Category',
    type: 'input',
    placeholder: 'Enter book category',
    colSpan: 2
  },
  {
    name: 'subCategory',
    label: 'Sub Category',
    type: 'input',
    placeholder: 'Enter sub category',
    colSpan: 2
  },
  {
    name: 'language',
    label: 'Language',
    type: 'input',
    placeholder: 'Enter language',
    colSpan: 2
  },
  {
    name: 'edition',
    label: 'Edition',
    type: 'input',
    placeholder: 'Enter edition',
    colSpan: 2
  },
  {
    name: 'totalCopies',
    label: 'Total Copies',
    type: 'input',
    placeholder: 'Enter total copies',
    colSpan: 1
  },
  {
    name: 'availableCopies',
    label: 'Available Copies',
    type: 'input',
    placeholder: 'Enter available copies',
    colSpan: 1
  },
  {
    name: 'location',
    label: 'Shelf Location',
    type: 'input',
    placeholder: 'Enter shelf location',
    colSpan: 2
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter book description',
    colSpan: 4
  },
  {
    name: 'isActive',
    label: 'Active Status',
    type: 'checkbox',
    colSpan: 1
  }
];

export const schoolConfig: FieldConfig[] = [
  {
    name: 'name',
    label: 'School Name',
    type: 'input',
    placeholder: 'Enter school name',
    required: true,
    colSpan: 2
  },
  {
    name: 'address',
    label: 'Address',
    type: 'textarea',
    placeholder: 'Enter complete address',
    colSpan: 4
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'input',
    placeholder: 'Enter phone number',
    colSpan: 2
  },
  {
    name: 'email',
    label: 'Email',
    type: 'input',
    placeholder: 'Enter email address',
    colSpan: 2
  },
  {
    name: 'website',
    label: 'Website',
    type: 'input',
    placeholder: 'Enter website URL',
    colSpan: 2
  },
  {
    name: 'establishedYear',
    label: 'Established Year',
    type: 'input',
    placeholder: 'Enter establishment year',
    colSpan: 2
  },
  {
    name: 'motto',
    label: 'Motto',
    type: 'textarea',
    placeholder: 'Enter school motto',
    colSpan: 4
  },
  {
    name: 'principalName',
    label: 'Principal Name',
    type: 'input',
    placeholder: 'Enter principal name',
    colSpan: 2
  },
  {
    name: 'registrationNumber',
    label: 'Registration Number',
    type: 'input',
    placeholder: 'Enter registration number',
    colSpan: 2
  },
  {
    name: 'isActive',
    label: 'Active Status',
    type: 'checkbox',
    colSpan: 1
  }
];

export const termConfig: FieldConfig[] = [
  {
    name: 'name',
    label: 'Term Name',
    type: 'input',
    placeholder: 'e.g., First Term 2024',
    required: true,
    colSpan: 2
  },
  {
    name: 'type',
    label: 'Term Type',
    type: 'select',
    required: true,
    options: [
      { label: 'First Term', value: 'first' },
      { label: 'Second Term', value: 'second' },
      { label: 'Third Term', value: 'third' }
    ],
    colSpan: 2
  },
  {
    name: 'startDate',
    label: 'Start Date',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'endDate',
    label: 'End Date',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'isActive',
    label: 'Set as Active Term',
    type: 'checkbox',
    colSpan: 1
  }
];

export const classSubjectConfig: FieldConfig[] = [
  {
    name: 'classId',
    label: 'Class',
    type: 'select',
    required: true,
    placeholder: 'Select class',
    colSpan: 2
  },
  {
    name: 'subjectId',
    label: 'Subject',
    type: 'select',
    required: true,
    placeholder: 'Select subject',
    colSpan: 2
  },
  {
    name: 'teacherId',
    label: 'Teacher',
    type: 'select',
    placeholder: 'Select teacher',
    colSpan: 2
  },
  {
    name: 'academicYearId',
    label: 'Academic Year',
    type: 'select',
    required: true,
    placeholder: 'Select academic year',
    colSpan: 2
  },
  {
    name: 'isActive',
    label: 'Active Status',
    type: 'checkbox',
    colSpan: 1
  }
];

export const timetableConfig: FieldConfig[] = [
  {
    name: 'classId',
    label: 'Class',
    type: 'select',
    required: true,
    placeholder: 'Select class',
    colSpan: 2
  },
  {
    name: 'subjectId',
    label: 'Subject',
    type: 'select',
    required: true,
    placeholder: 'Select subject',
    colSpan: 2
  },
  {
    name: 'teacherId',
    label: 'Teacher',
    type: 'select',
    required: true,
    placeholder: 'Select teacher',
    colSpan: 2
  },
  {
    name: 'dayOfWeek',
    label: 'Day of Week',
    type: 'select',
    required: true,
    options: [
      { label: 'Monday', value: 'monday' },
      { label: 'Tuesday', value: 'tuesday' },
      { label: 'Wednesday', value: 'wednesday' },
      { label: 'Thursday', value: 'thursday' },
      { label: 'Friday', value: 'friday' },
      { label: 'Saturday', value: 'saturday' },
      { label: 'Sunday', value: 'sunday' }
    ],
    colSpan: 2
  },
  {
    name: 'startTime',
    label: 'Start Time',
    type: 'input',
    placeholder: 'HH:MM format',
    required: true,
    colSpan: 1
  },
  {
    name: 'endTime',
    label: 'End Time',
    type: 'input',
    placeholder: 'HH:MM format',
    required: true,
    colSpan: 1
  },
  {
    name: 'room',
    label: 'Room',
    type: 'input',
    placeholder: 'Enter room number',
    colSpan: 2
  },
  {
    name: 'academicYearId',
    label: 'Academic Year',
    type: 'select',
    required: true,
    placeholder: 'Select academic year',
    colSpan: 2
  },
  {
    name: 'termId',
    label: 'Term',
    type: 'select',
    placeholder: 'Select term',
    colSpan: 2
  },
  {
    name: 'isActive',
    label: 'Active Status',
    type: 'checkbox',
    colSpan: 1
  }
];

export const examSubjectConfig: FieldConfig[] = [
  {
    name: 'examId',
    label: 'Exam',
    type: 'select',
    required: true,
    placeholder: 'Select exam',
    colSpan: 2
  },
  {
    name: 'subjectId',
    label: 'Subject',
    type: 'select',
    required: true,
    placeholder: 'Select subject',
    colSpan: 2
  },
  {
    name: 'classId',
    label: 'Class',
    type: 'select',
    required: true,
    placeholder: 'Select class',
    colSpan: 2
  },
  {
    name: 'maxMarks',
    label: 'Maximum Marks',
    type: 'input',
    required: true,
    placeholder: 'Enter maximum marks',
    colSpan: 1
  },
  {
    name: 'passMarks',
    label: 'Passing Marks',
    type: 'input',
    required: true,
    placeholder: 'Enter passing marks',
    colSpan: 1
  },
  {
    name: 'examDate',
    label: 'Exam Date',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'examTime',
    label: 'Exam Time',
    type: 'input',
    placeholder: 'Enter exam time',
    colSpan: 2
  },
  {
    name: 'duration',
    label: 'Duration (minutes)',
    type: 'input',
    placeholder: 'Enter duration in minutes',
    colSpan: 2
  },
  {
    name: 'room',
    label: 'Room',
    type: 'input',
    placeholder: 'Enter room number',
    colSpan: 2
  },
  {
    name: 'instructions',
    label: 'Instructions',
    type: 'textarea',
    placeholder: 'Enter exam instructions',
    colSpan: 4
  }
];

export const gradeConfig: FieldConfig[] = [
  {
    name: 'studentId',
    label: 'Student',
    type: 'select',
    required: true,
    placeholder: 'Select student',
    colSpan: 2
  },
  {
    name: 'examId',
    label: 'Exam',
    type: 'select',
    required: true,
    placeholder: 'Select exam',
    colSpan: 2
  },
  {
    name: 'subjectId',
    label: 'Subject',
    type: 'select',
    required: true,
    placeholder: 'Select subject',
    colSpan: 2
  },
  {
    name: 'marksObtained',
    label: 'Marks Obtained',
    type: 'input',
    placeholder: 'Enter marks obtained',
    colSpan: 2
  },
  {
    name: 'maxMarks',
    label: 'Maximum Marks',
    type: 'input',
    required: true,
    placeholder: 'Enter maximum marks',
    colSpan: 2
  },
  {
    name: 'grade',
    label: 'Grade',
    type: 'select',
    options: [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
      { label: 'D', value: 'D' },
      { label: 'F', value: 'F' }
    ],
    colSpan: 2
  },
  {
    name: 'percentage',
    label: 'Percentage',
    type: 'input',
    placeholder: 'Enter percentage',
    colSpan: 2
  },
  {
    name: 'remarks',
    label: 'Remarks',
    type: 'textarea',
    placeholder: 'Enter remarks',
    colSpan: 4
  },
  {
    name: 'teacherId',
    label: 'Teacher',
    type: 'select',
    placeholder: 'Select teacher',
    colSpan: 2
  },
  {
    name: 'isPublished',
    label: 'Publish Results',
    type: 'checkbox',
    colSpan: 1
  }
];

export const feePaymentConfig: FieldConfig[] = [
  {
    name: 'studentId',
    label: 'Student',
    type: 'select',
    required: true,
    placeholder: 'Select student',
    colSpan: 2
  },
  {
    name: 'feeStructureId',
    label: 'Fee Type',
    type: 'select',
    required: true,
    placeholder: 'Select fee type',
    colSpan: 2
  },
  {
    name: 'amount',
    label: 'Amount',
    type: 'input',
    required: true,
    placeholder: 'Enter payment amount',
    colSpan: 2
  },
  {
    name: 'paymentDate',
    label: 'Payment Date',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'paymentMethod',
    label: 'Payment Method',
    type: 'select',
    required: true,
    options: [
      { label: 'Cash', value: 'cash' },
      { label: 'Bank Transfer', value: 'bank_transfer' },
      { label: 'Mobile Money', value: 'mobile_money' },
      { label: 'Card', value: 'card' },
      { label: 'Cheque', value: 'cheque' }
    ],
    colSpan: 2
  },
  {
    name: 'transactionId',
    label: 'Transaction ID',
    type: 'input',
    placeholder: 'Enter transaction ID',
    colSpan: 2
  },
  {
    name: 'receiptNumber',
    label: 'Receipt Number',
    type: 'input',
    placeholder: 'Enter receipt number',
    colSpan: 2
  },
  {
    name: 'remarks',
    label: 'Remarks',
    type: 'textarea',
    placeholder: 'Enter payment remarks',
    colSpan: 4
  },
  {
    name: 'status',
    label: 'Payment Status',
    type: 'select',
    options: [
      { label: 'Pending', value: 'pending' },
      { label: 'Paid', value: 'paid' },
      { label: 'Overdue', value: 'overdue' },
      { label: 'Partial', value: 'partial' }
    ],
    colSpan: 2
  }
];

export const announcementConfig: FieldConfig[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'input',
    placeholder: 'Enter announcement title',
    required: true,
    colSpan: 2
  },
  {
    name: 'content',
    label: 'Content',
    type: 'textarea',
    placeholder: 'Enter announcement content',
    required: true,
    colSpan: 4
  },
  {
    name: 'priority',
    label: 'Priority',
    type: 'select',
    options: [
      { label: 'Low', value: 'low' },
      { label: 'Normal', value: 'normal' },
      { label: 'High', value: 'high' },
      { label: 'Urgent', value: 'urgent' }
    ],
    colSpan: 2
  },
  {
    name: 'targetAudience',
    label: 'Target Audience',
    type: 'combobox',
    placeholder: 'Select target audience',
    colSpan: 2
  },
  {
    name: 'publishDate',
    label: 'Publish Date',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'expiryDate',
    label: 'Expiry Date',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'isActive',
    label: 'Active Status',
    type: 'checkbox',
    colSpan: 1
  }
];

export const communicationConfig: FieldConfig[] = [
  {
    name: 'recipientType',
    label: 'Recipient Type',
    type: 'select',
    required: true,
    options: [
      { label: 'Individual', value: 'individual' },
      { label: 'Group', value: 'group' },
      { label: 'Class', value: 'class' },
      { label: 'All', value: 'all' }
    ],
    colSpan: 2
  },
  {
    name: 'recipientIds',
    label: 'Recipients',
    type: 'combobox',
    placeholder: 'Select recipients',
    colSpan: 2
  },
  {
    name: 'type',
    label: 'Communication Type',
    type: 'select',
    required: true,
    options: [
      { label: 'SMS', value: 'sms' },
      { label: 'Email', value: 'email' },
      { label: 'WhatsApp', value: 'whatsapp' },
      { label: 'Call', value: 'call' },
      { label: 'Notification', value: 'notification' }
    ],
    colSpan: 2
  },
  {
    name: 'subject',
    label: 'Subject',
    type: 'input',
    placeholder: 'Enter message subject',
    colSpan: 2
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    placeholder: 'Enter your message',
    required: true,
    colSpan: 4
  },
  {
    name: 'scheduledAt',
    label: 'Schedule Send',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { label: 'Draft', value: 'draft' },
      { label: 'Sent', value: 'sent' },
      { label: 'Scheduled', value: 'scheduled' }
    ],
    colSpan: 2
  }
];

export const hostelConfig: FieldConfig[] = [
  {
    name: 'name',
    label: 'Hostel Name',
    type: 'input',
    placeholder: 'Enter hostel name',
    required: true,
    colSpan: 2
  },
  {
    name: 'type',
    label: 'Hostel Type',
    type: 'select',
    required: true,
    options: [
      { label: 'Boys', value: 'boys' },
      { label: 'Girls', value: 'girls' },
      { label: 'Mixed', value: 'mixed' }
    ],
    colSpan: 2
  },
  {
    name: 'capacity',
    label: 'Capacity',
    type: 'input',
    placeholder: 'Enter total capacity',
    required: true,
    colSpan: 2
  },
  {
    name: 'wardenId',
    label: 'Warden',
    type: 'select',
    placeholder: 'Select warden',
    colSpan: 2
  },
  {
    name: 'address',
    label: 'Address',
    type: 'textarea',
    placeholder: 'Enter hostel address',
    colSpan: 4
  },
  {
    name: 'facilities',
    label: 'Facilities',
    type: 'textarea',
    placeholder: 'Enter available facilities',
    colSpan: 4
  },
  {
    name: 'rules',
    label: 'Rules',
    type: 'textarea',
    placeholder: 'Enter hostel rules',
    colSpan: 4
  },
  {
    name: 'isActive',
    label: 'Active Status',
    type: 'checkbox',
    colSpan: 1
  }
];

export const hostelRoomConfig: FieldConfig[] = [
  {
    name: 'hostelId',
    label: 'Hostel',
    type: 'select',
    required: true,
    placeholder: 'Select hostel',
    colSpan: 2
  },
  {
    name: 'roomNumber',
    label: 'Room Number',
    type: 'input',
    placeholder: 'Enter room number',
    required: true,
    colSpan: 2
  },
  {
    name: 'capacity',
    label: 'Capacity',
    type: 'input',
    placeholder: 'Enter room capacity',
    required: true,
    colSpan: 2
  },
  {
    name: 'currentOccupancy',
    label: 'Current Occupancy',
    type: 'input',
    placeholder: 'Enter current occupancy',
    colSpan: 2
  },
  {
    name: 'facilities',
    label: 'Facilities',
    type: 'textarea',
    placeholder: 'Enter room facilities',
    colSpan: 4
  },
  {
    name: 'monthlyFee',
    label: 'Monthly Fee',
    type: 'input',
    placeholder: 'Enter monthly fee',
    colSpan: 2
  },
  {
    name: 'isActive',
    label: 'Active Status',
    type: 'checkbox',
    colSpan: 1
  }
];

export const hostelAllocationConfig: FieldConfig[] = [
  {
    name: 'studentId',
    label: 'Student',
    type: 'select',
    required: true,
    placeholder: 'Select student',
    colSpan: 2
  },
  {
    name: 'hostelId',
    label: 'Hostel',
    type: 'select',
    required: true,
    placeholder: 'Select hostel',
    colSpan: 2
  },
  {
    name: 'roomId',
    label: 'Room',
    type: 'select',
    required: true,
    placeholder: 'Select room',
    colSpan: 2
  },
  {
    name: 'academicYearId',
    label: 'Academic Year',
    type: 'select',
    required: true,
    placeholder: 'Select academic year',
    colSpan: 2
  },
  {
    name: 'allocationDate',
    label: 'Allocation Date',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'vacationDate',
    label: 'Vacation Date',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'monthlyFee',
    label: 'Monthly Fee',
    type: 'input',
    placeholder: 'Enter monthly fee',
    colSpan: 2
  },
  {
    name: 'isActive',
    label: 'Active Status',
    type: 'checkbox',
    colSpan: 1
  }
];

export const inventoryCategoryConfig: FieldConfig[] = [
  {
    name: 'name',
    label: 'Category Name',
    type: 'input',
    placeholder: 'Enter category name',
    required: true,
    colSpan: 2
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter category description',
    colSpan: 4
  },
  {
    name: 'isActive',
    label: 'Active Status',
    type: 'checkbox',
    colSpan: 1
  }
];

export const inventoryItemConfig: FieldConfig[] = [
  {
    name: 'categoryId',
    label: 'Category',
    type: 'select',
    required: true,
    placeholder: 'Select category',
    colSpan: 2
  },
  {
    name: 'name',
    label: 'Item Name',
    type: 'input',
    placeholder: 'Enter item name',
    required: true,
    colSpan: 2
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter item description',
    colSpan: 4
  },
  {
    name: 'sku',
    label: 'SKU',
    type: 'input',
    placeholder: 'Enter SKU code',
    colSpan: 2
  },
  {
    name: 'quantity',
    label: 'Quantity',
    type: 'input',
    placeholder: 'Enter current quantity',
    colSpan: 1
  },
  {
    name: 'minQuantity',
    label: 'Minimum Quantity',
    type: 'input',
    placeholder: 'Enter minimum quantity',
    colSpan: 1
  },
  {
    name: 'unitPrice',
    label: 'Unit Price',
    type: 'input',
    placeholder: 'Enter unit price',
    colSpan: 2
  },
  {
    name: 'location',
    label: 'Location',
    type: 'input',
    placeholder: 'Enter storage location',
    colSpan: 2
  },
  {
    name: 'supplier',
    label: 'Supplier',
    type: 'input',
    placeholder: 'Enter supplier name',
    colSpan: 2
  },
  {
    name: 'purchaseDate',
    label: 'Purchase Date',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'warrantyExpiry',
    label: 'Warranty Expiry',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'condition',
    label: 'Condition',
    type: 'select',
    options: [
      { label: 'Excellent', value: 'excellent' },
      { label: 'Good', value: 'good' },
      { label: 'Fair', value: 'fair' },
      { label: 'Poor', value: 'poor' }
    ],
    colSpan: 2
  },
  {
    name: 'isActive',
    label: 'Active Status',
    type: 'checkbox',
    colSpan: 1
  }
];

export const visitorConfig: FieldConfig[] = [
  {
    name: 'name',
    label: 'Visitor Name',
    type: 'input',
    placeholder: 'Enter visitor name',
    required: true,
    colSpan: 2
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'input',
    placeholder: 'Enter phone number',
    colSpan: 2
  },
  {
    name: 'email',
    label: 'Email',
    type: 'input',
    placeholder: 'Enter email address',
    colSpan: 2
  },
  {
    name: 'idType',
    label: 'ID Type',
    type: 'input',
    placeholder: 'Enter ID type',
    colSpan: 2
  },
  {
    name: 'idNumber',
    label: 'ID Number',
    type: 'input',
    placeholder: 'Enter ID number',
    colSpan: 2
  },
  {
    name: 'address',
    label: 'Address',
    type: 'textarea',
    placeholder: 'Enter visitor address',
    colSpan: 4
  },
  {
    name: 'purpose',
    label: 'Purpose of Visit',
    type: 'textarea',
    placeholder: 'Enter purpose of visit',
    required: true,
    colSpan: 4
  },
  {
    name: 'personToMeet',
    label: 'Person to Meet',
    type: 'input',
    placeholder: 'Enter person to meet',
    required: true,
    colSpan: 2
  },
  {
    name: 'visitDate',
    label: 'Visit Date',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'checkInTime',
    label: 'Check-in Time',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'checkOutTime',
    label: 'Check-out Time',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'remarks',
    label: 'Remarks',
    type: 'textarea',
    placeholder: 'Enter any remarks',
    colSpan: 4
  }
];

export const leaveConfig: FieldConfig[] = [
  {
    name: 'applicantType',
    label: 'Applicant Type',
    type: 'select',
    required: true,
    options: [
      { label: 'Staff', value: 'staff' },
      { label: 'Student', value: 'student' }
    ],
    colSpan: 2
  },
  {
    name: 'applicantId',
    label: 'Applicant',
    type: 'select',
    required: true,
    placeholder: 'Select applicant',
    colSpan: 2
  },
  {
    name: 'leaveType',
    label: 'Leave Type',
    type: 'select',
    required: true,
    options: [
      { label: 'Sick Leave', value: 'sick' },
      { label: 'Annual Leave', value: 'annual' },
      { label: 'Maternity Leave', value: 'maternity' },
      { label: 'Paternity Leave', value: 'paternity' },
      { label: 'Emergency Leave', value: 'emergency' },
      { label: 'Study Leave', value: 'study' }
    ],
    colSpan: 2
  },
  {
    name: 'startDate',
    label: 'Start Date',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'endDate',
    label: 'End Date',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'days',
    label: 'Number of Days',
    type: 'input',
    required: true,
    placeholder: 'Enter number of days',
    colSpan: 1
  },
  {
    name: 'reason',
    label: 'Reason',
    type: 'textarea',
    placeholder: 'Enter leave reason',
    required: true,
    colSpan: 4
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { label: 'Pending', value: 'pending' },
      { label: 'Approved', value: 'approved' },
      { label: 'Rejected', value: 'rejected' }
    ],
    colSpan: 2
  }
];

export const disciplinaryRecordConfig: FieldConfig[] = [
  {
    name: 'studentId',
    label: 'Student',
    type: 'select',
    required: true,
    placeholder: 'Select student',
    colSpan: 2
  },
  {
    name: 'incidentDate',
    label: 'Incident Date',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'incidentType',
    label: 'Incident Type',
    type: 'input',
    placeholder: 'Enter incident type',
    required: true,
    colSpan: 2
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter incident description',
    required: true,
    colSpan: 4
  },
  {
    name: 'actionTaken',
    label: 'Action Taken',
    type: 'textarea',
    placeholder: 'Enter action taken',
    colSpan: 4
  },
  {
    name: 'reportedBy',
    label: 'Reported By',
    type: 'select',
    placeholder: 'Select staff member',
    colSpan: 2
  },
  {
    name: 'severity',
    label: 'Severity',
    type: 'select',
    options: [
      { label: 'Minor', value: 'minor' },
      { label: 'Major', value: 'major' },
      { label: 'Severe', value: 'severe' }
    ],
    colSpan: 2
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { label: 'Open', value: 'open' },
      { label: 'Closed', value: 'closed' },
      { label: 'Resolved', value: 'resolved' }
    ],
    colSpan: 2
  },
  {
    name: 'parentNotified',
    label: 'Parent Notified',
    type: 'checkbox',
    colSpan: 1
  },
  {
    name: 'followUpRequired',
    label: 'Follow-up Required',
    type: 'checkbox',
    colSpan: 1
  },
  {
    name: 'followUpDate',
    label: 'Follow-up Date',
    type: 'date',
    colSpan: 2
  }
];

export const transportRouteConfig: FieldConfig[] = [
  {
    name: 'routeName',
    label: 'Route Name',
    type: 'input',
    placeholder: 'Enter route name',
    required: true,
    colSpan: 2
  },
  {
    name: 'routeCode',
    label: 'Route Code',
    type: 'input',
    placeholder: 'Enter route code',
    colSpan: 2
  },
  {
    name: 'startPoint',
    label: 'Start Point',
    type: 'input',
    placeholder: 'Enter start point',
    colSpan: 2
  },
  {
    name: 'endPoint',
    label: 'End Point',
    type: 'input',
    placeholder: 'Enter end point',
    colSpan: 2
  },
  {
    name: 'distance',
    label: 'Distance (km)',
    type: 'input',
    placeholder: 'Enter distance in km',
    colSpan: 2
  },
  {
    name: 'estimatedTime',
    label: 'Estimated Time (minutes)',
    type: 'input',
    placeholder: 'Enter estimated time',
    colSpan: 2
  },
  {
    name: 'monthlyFee',
    label: 'Monthly Fee',
    type: 'input',
    placeholder: 'Enter monthly fee',
    colSpan: 2
  },
  {
    name: 'isActive',
    label: 'Active Status',
    type: 'checkbox',
    colSpan: 1
  }
];

export const transportVehicleConfig: FieldConfig[] = [
  {
    name: 'vehicleNumber',
    label: 'Vehicle Number',
    type: 'input',
    placeholder: 'Enter vehicle number',
    required: true,
    colSpan: 2
  },
  {
    name: 'vehicleType',
    label: 'Vehicle Type',
    type: 'select',
    required: true,
    options: [
      { label: 'Bus', value: 'bus' },
      { label: 'Van', value: 'van' },
      { label: 'Car', value: 'car' }
    ],
    colSpan: 2
  },
  {
    name: 'capacity',
    label: 'Capacity',
    type: 'input',
    placeholder: 'Enter passenger capacity',
    required: true,
    colSpan: 2
  },
  {
    name: 'driverId',
    label: 'Driver',
    type: 'select',
    placeholder: 'Select driver',
    colSpan: 2
  },
  {
    name: 'conductorId',
    label: 'Conductor',
    type: 'select',
    placeholder: 'Select conductor',
    colSpan: 2
  },
  {
    name: 'routeId',
    label: 'Route',
    type: 'select',
    placeholder: 'Select route',
    colSpan: 2
  },
  {
    name: 'insuranceExpiry',
    label: 'Insurance Expiry',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'permitExpiry',
    label: 'Permit Expiry',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'fitnessExpiry',
    label: 'Fitness Expiry',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'lastServiceDate',
    label: 'Last Service Date',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'nextServiceDate',
    label: 'Next Service Date',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'fuelType',
    label: 'Fuel Type',
    type: 'input',
    placeholder: 'Enter fuel type',
    colSpan: 2
  },
  {
    name: 'averageMileage',
    label: 'Average Mileage',
    type: 'input',
    placeholder: 'Enter average mileage',
    colSpan: 2
  },
  {
    name: 'isActive',
    label: 'Active Status',
    type: 'checkbox',
    colSpan: 1
  }
];

export const transportAllocationConfig: FieldConfig[] = [
  {
    name: 'studentId',
    label: 'Student',
    type: 'select',
    required: true,
    placeholder: 'Select student',
    colSpan: 2
  },
  {
    name: 'routeId',
    label: 'Route',
    type: 'select',
    required: true,
    placeholder: 'Select route',
    colSpan: 2
  },
  {
    name: 'vehicleId',
    label: 'Vehicle',
    type: 'select',
    placeholder: 'Select vehicle',
    colSpan: 2
  },
  {
    name: 'academicYearId',
    label: 'Academic Year',
    type: 'select',
    required: true,
    placeholder: 'Select academic year',
    colSpan: 2
  },
  {
    name: 'pickupPoint',
    label: 'Pickup Point',
    type: 'input',
    placeholder: 'Enter pickup point',
    colSpan: 2
  },
  {
    name: 'dropPoint',
    label: 'Drop Point',
    type: 'input',
    placeholder: 'Enter drop point',
    colSpan: 2
  },
  {
    name: 'monthlyFee',
    label: 'Monthly Fee',
    type: 'input',
    placeholder: 'Enter monthly fee',
    colSpan: 2
  },
  {
    name: 'allocationDate',
    label: 'Allocation Date',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'isActive',
    label: 'Active Status',
    type: 'checkbox',
    colSpan: 1
  }
];

export const libraryIssueConfig: FieldConfig[] = [
  {
    name: 'bookId',
    label: 'Book',
    type: 'select',
    required: true,
    placeholder: 'Select book',
    colSpan: 2
  },
  {
    name: 'studentId',
    label: 'Student',
    type: 'select',
    placeholder: 'Select student',
    colSpan: 2
  },
  {
    name: 'staffId',
    label: 'Staff',
    type: 'select',
    placeholder: 'Select staff',
    colSpan: 2
  },
  {
    name: 'issueDate',
    label: 'Issue Date',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'dueDate',
    label: 'Due Date',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'returnDate',
    label: 'Return Date',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'fineAmount',
    label: 'Fine Amount',
    type: 'input',
    placeholder: 'Enter fine amount',
    colSpan: 2
  },
  {
    name: 'bookCondition',
    label: 'Book Condition',
    type: 'select',
    options: [
      { label: 'Excellent', value: 'excellent' },
      { label: 'Good', value: 'good' },
      { label: 'Fair', value: 'fair' },
      { label: 'Poor', value: 'poor' }
    ],
    colSpan: 2
  },
  {
    name: 'remarks',
    label: 'Remarks',
    type: 'textarea',
    placeholder: 'Enter remarks',
    colSpan: 4
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { label: 'Issued', value: 'issued' },
      { label: 'Returned', value: 'returned' },
      { label: 'Overdue', value: 'overdue' },
      { label: 'Lost', value: 'lost' }
    ],
    colSpan: 2
  }
];

export const cafeteriaMenuConfig: FieldConfig[] = [
  {
    name: 'itemName',
    label: 'Item Name',
    type: 'input',
    placeholder: 'Enter item name',
    required: true,
    colSpan: 2
  },
  {
    name: 'category',
    label: 'Category',
    type: 'select',
    options: [
      { label: 'Breakfast', value: 'breakfast' },
      { label: 'Lunch', value: 'lunch' },
      { label: 'Snacks', value: 'snacks' },
      { label: 'Dinner', value: 'dinner' }
    ],
    colSpan: 2
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter item description',
    colSpan: 4
  },
  {
    name: 'price',
    label: 'Price',
    type: 'input',
    placeholder: 'Enter price',
    required: true,
    colSpan: 2
  },
  {
    name: 'ingredients',
    label: 'Ingredients',
    type: 'textarea',
    placeholder: 'Enter ingredients',
    colSpan: 4
  },
  {
    name: 'allergens',
    label: 'Allergens',
    type: 'textarea',
    placeholder: 'Enter allergen information',
    colSpan: 4
  },
  {
    name: 'isVegetarian',
    label: 'Vegetarian',
    type: 'checkbox',
    colSpan: 1
  },
  {
    name: 'isVegan',
    label: 'Vegan',
    type: 'checkbox',
    colSpan: 1
  },
  {
    name: 'isAvailable',
    label: 'Available',
    type: 'checkbox',
    colSpan: 1
  }
];

export const medicalRecordConfig: FieldConfig[] = [
  {
    name: 'studentId',
    label: 'Student',
    type: 'select',
    placeholder: 'Select student',
    colSpan: 2
  },
  {
    name: 'staffId',
    label: 'Staff',
    type: 'select',
    placeholder: 'Select staff',
    colSpan: 2
  },
  {
    name: 'recordDate',
    label: 'Record Date',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'recordType',
    label: 'Record Type',
    type: 'select',
    required: true,
    options: [
      { label: 'Checkup', value: 'checkup' },
      { label: 'Incident', value: 'incident' },
      { label: 'Vaccination', value: 'vaccination' },
      { label: 'Prescription', value: 'prescription' }
    ],
    colSpan: 2
  },
  {
    name: 'symptoms',
    label: 'Symptoms',
    type: 'textarea',
    placeholder: 'Enter symptoms',
    colSpan: 4
  },
  {
    name: 'diagnosis',
    label: 'Diagnosis',
    type: 'textarea',
    placeholder: 'Enter diagnosis',
    colSpan: 4
  },
  {
    name: 'treatment',
    label: 'Treatment',
    type: 'textarea',
    placeholder: 'Enter treatment',
    colSpan: 4
  },
  {
    name: 'prescription',
    label: 'Prescription',
    type: 'textarea',
    placeholder: 'Enter prescription',
    colSpan: 4
  },
  {
    name: 'doctorName',
    label: 'Doctor Name',
    type: 'input',
    placeholder: 'Enter doctor name',
    colSpan: 2
  },
  {
    name: 'nurseId',
    label: 'Nurse',
    type: 'select',
    placeholder: 'Select nurse',
    colSpan: 2
  },
  {
    name: 'followUpRequired',
    label: 'Follow-up Required',
    type: 'checkbox',
    colSpan: 1
  },
  {
    name: 'followUpDate',
    label: 'Follow-up Date',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'parentNotified',
    label: 'Parent Notified',
    type: 'checkbox',
    colSpan: 1
  }
];

export const activityConfig: FieldConfig[] = [
  {
    name: 'name',
    label: 'Activity Name',
    type: 'input',
    placeholder: 'Enter activity name',
    required: true,
    colSpan: 2
  },
  {
    name: 'type',
    label: 'Activity Type',
    type: 'select',
    required: true,
    options: [
      { label: 'Sports', value: 'sports' },
      { label: 'Music', value: 'music' },
      { label: 'Art', value: 'art' },
      { label: 'Drama', value: 'drama' },
      { label: 'Debate', value: 'debate' },
      { label: 'Other', value: 'other' }
    ],
    colSpan: 2
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter activity description',
    colSpan: 4
  },
  {
    name: 'coachId',
    label: 'Coach/Instructor',
    type: 'select',
    placeholder: 'Select coach',
    colSpan: 2
  },
  {
    name: 'maxParticipants',
    label: 'Maximum Participants',
    type: 'input',
    placeholder: 'Enter maximum participants',
    colSpan: 2
  },
  {
    name: 'venue',
    label: 'Venue',
    type: 'input',
    placeholder: 'Enter activity venue',
    colSpan: 2
  },
  {
    name: 'fee',
    label: 'Fee',
    type: 'input',
    placeholder: 'Enter activity fee',
    colSpan: 2
  },
  {
    name: 'requirements',
    label: 'Requirements',
    type: 'textarea',
    placeholder: 'Enter requirements',
    colSpan: 4
  },
  {
    name: 'isActive',
    label: 'Active Status',
    type: 'checkbox',
    colSpan: 1
  }
];

export const competitionConfig: FieldConfig[] = [
  {
    name: 'name',
    label: 'Competition Name',
    type: 'input',
    placeholder: 'Enter competition name',
    required: true,
    colSpan: 2
  },
  {
    name: 'type',
    label: 'Competition Type',
    type: 'select',
    required: true,
    options: [
      { label: 'Academic', value: 'academic' },
      { label: 'Sports', value: 'sports' },
      { label: 'Cultural', value: 'cultural' }
    ],
    colSpan: 2
  },
  {
    name: 'level',
    label: 'Competition Level',
    type: 'select',
    required: true,
    options: [
      { label: 'School', value: 'school' },
      { label: 'District', value: 'district' },
      { label: 'State', value: 'state' },
      { label: 'National', value: 'national' },
      { label: 'International', value: 'international' }
    ],
    colSpan: 2
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter competition description',
    colSpan: 4
  },
  {
    name: 'organizer',
    label: 'Organizer',
    type: 'input',
    placeholder: 'Enter organizer name',
    colSpan: 2
  },
  {
    name: 'venue',
    label: 'Venue',
    type: 'input',
    placeholder: 'Enter competition venue',
    colSpan: 2
  },
  {
    name: 'startDate',
    label: 'Start Date',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'endDate',
    label: 'End Date',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'registrationDeadline',
    label: 'Registration Deadline',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'fee',
    label: 'Registration Fee',
    type: 'input',
    placeholder: 'Enter registration fee',
    colSpan: 2
  },
  {
    name: 'maxParticipants',
    label: 'Maximum Participants',
    type: 'input',
    placeholder: 'Enter maximum participants',
    colSpan: 2
  },
  {
    name: 'eligibilityCriteria',
    label: 'Eligibility Criteria',
    type: 'textarea',
    placeholder: 'Enter eligibility criteria',
    colSpan: 4
  },
  {
    name: 'rules',
    label: 'Rules',
    type: 'textarea',
    placeholder: 'Enter competition rules',
    colSpan: 4
  },
  {
    name: 'coordinatorId',
    label: 'Coordinator',
    type: 'select',
    placeholder: 'Select coordinator',
    colSpan: 2
  },
  {
    name: 'isActive',
    label: 'Active Status',
    type: 'checkbox',
    colSpan: 1
  }
];

export const certificateConfig: FieldConfig[] = [
  {
    name: 'studentId',
    label: 'Student',
    type: 'select',
    required: true,
    placeholder: 'Select student',
    colSpan: 2
  },
  {
    name: 'type',
    label: 'Certificate Type',
    type: 'select',
    required: true,
    options: [
      { label: 'Academic', value: 'academic' },
      { label: 'Sports', value: 'sports' },
      { label: 'Behavior', value: 'behavior' },
      { label: 'Attendance', value: 'attendance' }
    ],
    colSpan: 2
  },
  {
    name: 'title',
    label: 'Title',
    type: 'input',
    placeholder: 'Enter certificate title',
    required: true,
    colSpan: 2
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter certificate description',
    colSpan: 4
  },
  {
    name: 'issueDate',
    label: 'Issue Date',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'validUntil',
    label: 'Valid Until',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'certificateNumber',
    label: 'Certificate Number',
    type: 'input',
    placeholder: 'Enter certificate number',
    colSpan: 2
  },
  {
    name: 'templateId',
    label: 'Template ID',
    type: 'input',
    placeholder: 'Enter template ID',
    colSpan: 2
  },
  {
    name: 'verificationCode',
    label: 'Verification Code',
    type: 'input',
    placeholder: 'Enter verification code',
    colSpan: 2
  },
  {
    name: 'isActive',
    label: 'Active Status',
    type: 'checkbox',
    colSpan: 1
  }
];

export const maintenanceRequestConfig: FieldConfig[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'input',
    placeholder: 'Enter request title',
    required: true,
    colSpan: 2
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter detailed description',
    required: true,
    colSpan: 4
  },
  {
    name: 'location',
    label: 'Location',
    type: 'input',
    placeholder: 'Enter location',
    colSpan: 2
  },
  {
    name: 'priority',
    label: 'Priority',
    type: 'select',
    options: [
      { label: 'Low', value: 'low' },
      { label: 'Medium', value: 'medium' },
      { label: 'High', value: 'high' },
      { label: 'Urgent', value: 'urgent' }
    ],
    colSpan: 2
  },
  {
    name: 'category',
    label: 'Category',
    type: 'select',
    options: [
      { label: 'Electrical', value: 'electrical' },
      { label: 'Plumbing', value: 'plumbing' },
      { label: 'Carpentry', value: 'carpentry' },
      { label: 'Painting', value: 'painting' },
      { label: 'Other', value: 'other' }
    ],
    colSpan: 2
  },
  {
    name: 'reportedBy',
    label: 'Reported By',
    type: 'select',
    placeholder: 'Select reporter',
    colSpan: 2
  },
  {
    name: 'assignedTo',
    label: 'Assigned To',
    type: 'select',
    placeholder: 'Select assignee',
    colSpan: 2
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { label: 'Pending', value: 'pending' },
      { label: 'In Progress', value: 'in_progress' },
      { label: 'Completed', value: 'completed' },
      { label: 'Cancelled', value: 'cancelled' }
    ],
    colSpan: 2
  },
  {
    name: 'estimatedCost',
    label: 'Estimated Cost',
    type: 'input',
    placeholder: 'Enter estimated cost',
    colSpan: 2
  },
  {
    name: 'startDate',
    label: 'Start Date',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'completionDate',
    label: 'Completion Date',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'remarks',
    label: 'Remarks',
    type: 'textarea',
    placeholder: 'Enter any remarks',
    colSpan: 4
  }
];

export const vendorConfig: FieldConfig[] = [
  {
    name: 'name',
    label: 'Vendor Name',
    type: 'input',
    placeholder: 'Enter vendor name',
    required: true,
    colSpan: 2
  },
  {
    name: 'contactPerson',
    label: 'Contact Person',
    type: 'input',
    placeholder: 'Enter contact person name',
    colSpan: 2
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'input',
    placeholder: 'Enter phone number',
    colSpan: 2
  },
  {
    name: 'email',
    label: 'Email',
    type: 'input',
    placeholder: 'Enter email address',
    colSpan: 2
  },
  {
    name: 'address',
    label: 'Address',
    type: 'textarea',
    placeholder: 'Enter vendor address',
    colSpan: 4
  },
  {
    name: 'category',
    label: 'Category',
    type: 'select',
    options: [
      { label: 'Supplies', value: 'supplies' },
      { label: 'Maintenance', value: 'maintenance' },
      { label: 'Food', value: 'food' },
      { label: 'Transport', value: 'transport' },
      { label: 'Other', value: 'other' }
    ],
    colSpan: 2
  },
  {
    name: 'taxNumber',
    label: 'Tax Number',
    type: 'input',
    placeholder: 'Enter tax number',
    colSpan: 2
  },
  {
    name: 'rating',
    label: 'Rating',
    type: 'input',
    placeholder: 'Enter rating (1-5)',
    colSpan: 2
  },
  {
    name: 'isActive',
    label: 'Active Status',
    type: 'checkbox',
    colSpan: 1
  }
];

export const expenseCategoryConfig: FieldConfig[] = [
  {
    name: 'name',
    label: 'Category Name',
    type: 'input',
    placeholder: 'Enter expense category name',
    required: true,
    colSpan: 2
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter category description',
    colSpan: 4
  },
  {
    name: 'budgetLimit',
    label: 'Budget Limit',
    type: 'input',
    placeholder: 'Enter budget limit for this category',
    colSpan: 2
  },
  {
    name: 'isActive',
    label: 'Active Status',
    type: 'checkbox',
    colSpan: 1
  }
];

export const expenseConfig: FieldConfig[] = [
  {
    name: 'categoryId',
    label: 'Expense Category',
    type: 'select',
    required: true,
    placeholder: 'Select expense category',
    colSpan: 2
  },
  {
    name: 'title',
    label: 'Expense Title',
    type: 'input',
    placeholder: 'Enter expense title',
    required: true,
    colSpan: 2
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter expense description',
    colSpan: 4
  },
  {
    name: 'amount',
    label: 'Amount',
    type: 'input',
    placeholder: 'Enter expense amount',
    required: true,
    colSpan: 2
  },
  {
    name: 'expenseDate',
    label: 'Expense Date',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'paymentMethod',
    label: 'Payment Method',
    type: 'select',
    required: true,
    options: [
      { label: 'Cash', value: 'cash' },
      { label: 'Bank Transfer', value: 'bank_transfer' },
      { label: 'Mobile Money', value: 'mobile_money' },
      { label: 'Card', value: 'card' },
      { label: 'Cheque', value: 'cheque' }
    ],
    colSpan: 2
  },
  {
    name: 'vendorId',
    label: 'Vendor',
    type: 'select',
    placeholder: 'Select vendor',
    colSpan: 2
  },
  {
    name: 'status',
    label: 'Expense Status',
    type: 'select',
    options: [
      { label: 'Pending', value: 'pending' },
      { label: 'Approved', value: 'approved' },
      { label: 'Rejected', value: 'rejected' },
      { label: 'Paid', value: 'paid' }
    ],
    colSpan: 2
  },
  {
    name: 'submittedBy',
    label: 'Submitted By',
    type: 'select',
    placeholder: 'Select submitter',
    colSpan: 2
  },
  {
    name: 'approvedBy',
    label: 'Approved By',
    type: 'select',
    placeholder: 'Select approver',
    colSpan: 2
  },
  {
    name: 'approvalDate',
    label: 'Approval Date',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'rejectionReason',
    label: 'Rejection Reason',
    type: 'textarea',
    placeholder: 'Enter reason for rejection',
    colSpan: 4
  }
];

export const payrollStructureConfig: FieldConfig[] = [
  {
    name: 'staffId',
    label: 'Staff Member',
    type: 'select',
    required: true,
    placeholder: 'Select staff member',
    colSpan: 2
  },
  {
    name: 'basicSalary',
    label: 'Basic Salary',
    type: 'input',
    placeholder: 'Enter basic salary',
    required: true,
    colSpan: 2
  },
  {
    name: 'grossSalary',
    label: 'Gross Salary',
    type: 'input',
    placeholder: 'Enter gross salary',
    required: true,
    colSpan: 2
  },
  {
    name: 'netSalary',
    label: 'Net Salary',
    type: 'input',
    placeholder: 'Enter net salary',
    required: true,
    colSpan: 2
  },
  {
    name: 'effectiveFrom',
    label: 'Effective From',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'effectiveTo',
    label: 'Effective To',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'isActive',
    label: 'Active Status',
    type: 'checkbox',
    colSpan: 1
  }
];

export const payrollRecordConfig: FieldConfig[] = [
  {
    name: 'staffId',
    label: 'Staff Member',
    type: 'select',
    required: true,
    placeholder: 'Select staff member',
    colSpan: 2
  },
  {
    name: 'payrollStructureId',
    label: 'Payroll Structure',
    type: 'select',
    required: true,
    placeholder: 'Select payroll structure',
    colSpan: 2
  },
  {
    name: 'payrollMonth',
    label: 'Payroll Month',
    type: 'input',
    placeholder: 'YYYY-MM format',
    required: true,
    colSpan: 2
  },
  {
    name: 'workingDays',
    label: 'Working Days',
    type: 'input',
    placeholder: 'Enter total working days',
    required: true,
    colSpan: 1
  },
  {
    name: 'presentDays',
    label: 'Present Days',
    type: 'input',
    placeholder: 'Enter present days',
    required: true,
    colSpan: 1
  },
  {
    name: 'leaveDays',
    label: 'Leave Days',
    type: 'input',
    placeholder: 'Enter leave days',
    colSpan: 1
  },
  {
    name: 'overtime',
    label: 'Overtime Hours',
    type: 'input',
    placeholder: 'Enter overtime hours',
    colSpan: 1
  },
  {
    name: 'overtimeRate',
    label: 'Overtime Rate',
    type: 'input',
    placeholder: 'Enter overtime rate',
    colSpan: 1
  },
  {
    name: 'bonuses',
    label: 'Bonuses',
    type: 'input',
    placeholder: 'Enter bonus amount',
    colSpan: 1
  },
  {
    name: 'penalties',
    label: 'Penalties',
    type: 'input',
    placeholder: 'Enter penalty amount',
    colSpan: 1
  },
  {
    name: 'grossSalary',
    label: 'Gross Salary',
    type: 'input',
    placeholder: 'Enter gross salary',
    required: true,
    colSpan: 2
  },
  {
    name: 'totalDeductions',
    label: 'Total Deductions',
    type: 'input',
    placeholder: 'Enter total deductions',
    required: true,
    colSpan: 2
  },
  {
    name: 'netSalary',
    label: 'Net Salary',
    type: 'input',
    placeholder: 'Enter net salary',
    required: true,
    colSpan: 2
  },
  {
    name: 'paymentDate',
    label: 'Payment Date',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'paymentMethod',
    label: 'Payment Method',
    type: 'select',
    options: [
      { label: 'Cash', value: 'cash' },
      { label: 'Bank Transfer', value: 'bank_transfer' },
      { label: 'Mobile Money', value: 'mobile_money' },
      { label: 'Card', value: 'card' },
      { label: 'Cheque', value: 'cheque' }
    ],
    colSpan: 2
  },
  {
    name: 'paymentReference',
    label: 'Payment Reference',
    type: 'input',
    placeholder: 'Enter payment reference',
    colSpan: 2
  },
  {
    name: 'status',
    label: 'Payment Status',
    type: 'select',
    options: [
      { label: 'Pending', value: 'pending' },
      { label: 'Processed', value: 'processed' },
      { label: 'Paid', value: 'paid' }
    ],
    colSpan: 2
  },
  {
    name: 'generatedBy',
    label: 'Generated By',
    type: 'select',
    placeholder: 'Select generator',
    colSpan: 2
  },
  {
    name: 'approvedBy',
    label: 'Approved By',
    type: 'select',
    placeholder: 'Select approver',
    colSpan: 2
  }
];

export const purchaseOrderConfig: FieldConfig[] = [
  {
    name: 'vendorId',
    label: 'Vendor',
    type: 'select',
    required: true,
    placeholder: 'Select vendor',
    colSpan: 2
  },
  {
    name: 'orderNumber',
    label: 'Order Number',
    type: 'input',
    placeholder: 'Enter order number',
    required: true,
    colSpan: 2
  },
  {
    name: 'orderDate',
    label: 'Order Date',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'expectedDelivery',
    label: 'Expected Delivery',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'actualDelivery',
    label: 'Actual Delivery',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'totalAmount',
    label: 'Total Amount',
    type: 'input',
    placeholder: 'Enter total amount',
    required: true,
    colSpan: 2
  },
  {
    name: 'taxAmount',
    label: 'Tax Amount',
    type: 'input',
    placeholder: 'Enter tax amount',
    colSpan: 2
  },
  {
    name: 'discountAmount',
    label: 'Discount Amount',
    type: 'input',
    placeholder: 'Enter discount amount',
    colSpan: 2
  },
  {
    name: 'finalAmount',
    label: 'Final Amount',
    type: 'input',
    placeholder: 'Enter final amount',
    required: true,
    colSpan: 2
  },
  {
    name: 'status',
    label: 'Order Status',
    type: 'select',
    options: [
      { label: 'Pending', value: 'pending' },
      { label: 'Approved', value: 'approved' },
      { label: 'Ordered', value: 'ordered' },
      { label: 'Received', value: 'received' },
      { label: 'Cancelled', value: 'cancelled' }
    ],
    colSpan: 2
  },
  {
    name: 'approvedBy',
    label: 'Approved By',
    type: 'select',
    placeholder: 'Select approver',
    colSpan: 2
  },
  {
    name: 'receivedBy',
    label: 'Received By',
    type: 'select',
    placeholder: 'Select receiver',
    colSpan: 2
  },
  {
    name: 'remarks',
    label: 'Remarks',
    type: 'textarea',
    placeholder: 'Enter order remarks',
    colSpan: 4
  },
  {
    name: 'createdBy',
    label: 'Created By',
    type: 'select',
    placeholder: 'Select creator',
    colSpan: 2
  }
];

export const systemSettingsConfig: FieldConfig[] = [
  {
    name: 'settingKey',
    label: 'Setting Key',
    type: 'input',
    placeholder: 'Enter setting key',
    required: true,
    colSpan: 2
  },
  {
    name: 'settingValue',
    label: 'Setting Value',
    type: 'textarea',
    placeholder: 'Enter setting value',
    required: true,
    colSpan: 4
  },
  {
    name: 'dataType',
    label: 'Data Type',
    type: 'select',
    options: [
      { label: 'String', value: 'string' },
      { label: 'Number', value: 'number' },
      { label: 'Boolean', value: 'boolean' },
      { label: 'JSON', value: 'json' }
    ],
    colSpan: 2
  },
  {
    name: 'category',
    label: 'Category',
    type: 'select',
    options: [
      { label: 'General', value: 'general' },
      { label: 'Academic', value: 'academic' },
      { label: 'Financial', value: 'financial' },
      { label: 'Communication', value: 'communication' },
      { label: 'Security', value: 'security' }
    ],
    colSpan: 2
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter setting description',
    colSpan: 4
  },
  {
    name: 'isEditable',
    label: 'Editable',
    type: 'checkbox',
    colSpan: 1
  },
  {
    name: 'updatedBy',
    label: 'Updated By',
    type: 'select',
    placeholder: 'Select updater',
    colSpan: 2
  }
];

export const notificationConfig: FieldConfig[] = [
  {
    name: 'userId',
    label: 'Recipient',
    type: 'select',
    required: true,
    placeholder: 'Select recipient',
    colSpan: 2
  },
  {
    name: 'title',
    label: 'Title',
    type: 'input',
    placeholder: 'Enter notification title',
    required: true,
    colSpan: 2
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    placeholder: 'Enter notification message',
    required: true,
    colSpan: 4
  },
  {
    name: 'type',
    label: 'Notification Type',
    type: 'select',
    required: true,
    options: [
      { label: 'Info', value: 'info' },
      { label: 'Warning', value: 'warning' },
      { label: 'Error', value: 'error' },
      { label: 'Success', value: 'success' }
    ],
    colSpan: 2
  },
  {
    name: 'isRead',
    label: 'Mark as Read',
    type: 'checkbox',
    colSpan: 1
  },
  {
    name: 'actionUrl',
    label: 'Action URL',
    type: 'input',
    placeholder: 'Enter action URL',
    colSpan: 2
  },
  {
    name: 'expiryDate',
    label: 'Expiry Date',
    type: 'date',
    colSpan: 2
  }
];

export const fileStorageConfig: FieldConfig[] = [
  {
    name: 'fileName',
    label: 'File Name',
    type: 'input',
    placeholder: 'Enter file name',
    required: true,
    colSpan: 2
  },
  {
    name: 'originalName',
    label: 'Original Name',
    type: 'input',
    placeholder: 'Enter original file name',
    required: true,
    colSpan: 2
  },
  {
    name: 'filePath',
    label: 'File Path',
    type: 'input',
    placeholder: 'Enter file path',
    required: true,
    colSpan: 2
  },
  {
    name: 'fileSize',
    label: 'File Size (bytes)',
    type: 'input',
    placeholder: 'Enter file size',
    required: true,
    colSpan: 1
  },
  {
    name: 'mimeType',
    label: 'MIME Type',
    type: 'input',
    placeholder: 'Enter MIME type',
    required: true,
    colSpan: 2
  },
  {
    name: 'uploadedBy',
    label: 'Uploaded By',
    type: 'select',
    placeholder: 'Select uploader',
    colSpan: 2
  },
  {
    name: 'isPublic',
    label: 'Public File',
    type: 'checkbox',
    colSpan: 1
  },
  {
    name: 'tags',
    label: 'Tags',
    type: 'textarea',
    placeholder: 'Enter tags (comma separated)',
    colSpan: 4
  }
];

export const studentParentConfig: FieldConfig[] = [
  {
    name: 'studentId',
    label: 'Student',
    type: 'select',
    required: true,
    placeholder: 'Select student',
    colSpan: 2
  },
  {
    name: 'parentId',
    label: 'Parent/Guardian',
    type: 'select',
    required: true,
    placeholder: 'Select parent/guardian',
    colSpan: 2
  },
  {
    name: 'relationship',
    label: 'Relationship',
    type: 'select',
    required: true,
    options: [
      { label: 'Father', value: 'father' },
      { label: 'Mother', value: 'mother' },
      { label: 'Guardian', value: 'guardian' },
      { label: 'Other', value: 'other' }
    ],
    colSpan: 2
  },
  {
    name: 'isGuardian',
    label: 'Is Legal Guardian',
    type: 'checkbox',
    colSpan: 1
  }
];

export const siblingConfig: FieldConfig[] = [
  {
    name: 'studentId',
    label: 'Student',
    type: 'select',
    required: true,
    placeholder: 'Select student',
    colSpan: 2
  },
  {
    name: 'siblingId',
    label: 'Sibling',
    type: 'select',
    required: true,
    placeholder: 'Select sibling',
    colSpan: 2
  }
];

export const activityParticipantConfig: FieldConfig[] = [
  {
    name: 'activityId',
    label: 'Activity',
    type: 'select',
    required: true,
    placeholder: 'Select activity',
    colSpan: 2
  },
  {
    name: 'studentId',
    label: 'Student',
    type: 'select',
    required: true,
    placeholder: 'Select student',
    colSpan: 2
  },
  {
    name: 'academicYearId',
    label: 'Academic Year',
    type: 'select',
    required: true,
    placeholder: 'Select academic year',
    colSpan: 2
  },
  {
    name: 'joinDate',
    label: 'Join Date',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'leaveDate',
    label: 'Leave Date',
    type: 'date',
    colSpan: 2
  },
  {
    name: 'performance',
    label: 'Performance Notes',
    type: 'textarea',
    placeholder: 'Enter performance notes',
    colSpan: 4
  },
  {
    name: 'isActive',
    label: 'Active Participation',
    type: 'checkbox',
    colSpan: 1
  }
];

export const competitionParticipantConfig: FieldConfig[] = [
  {
    name: 'competitionId',
    label: 'Competition',
    type: 'select',
    required: true,
    placeholder: 'Select competition',
    colSpan: 2
  },
  {
    name: 'studentId',
    label: 'Student',
    type: 'select',
    required: true,
    placeholder: 'Select student',
    colSpan: 2
  },
  {
    name: 'registrationDate',
    label: 'Registration Date',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'participationStatus',
    label: 'Participation Status',
    type: 'select',
    options: [
      { label: 'Registered', value: 'registered' },
      { label: 'Participated', value: 'participated' },
      { label: 'Absent', value: 'absent' }
    ],
    colSpan: 2
  },
  {
    name: 'result',
    label: 'Result',
    type: 'input',
    placeholder: 'Enter competition result',
    colSpan: 2
  },
  {
    name: 'position',
    label: 'Position/Rank',
    type: 'input',
    placeholder: 'Enter position/rank',
    colSpan: 1
  },
  {
    name: 'score',
    label: 'Score',
    type: 'input',
    placeholder: 'Enter score',
    colSpan: 1
  },
  {
    name: 'certificate',
    label: 'Certificate',
    type: 'input',
    placeholder: 'Enter certificate details',
    colSpan: 2
  },
  {
    name: 'remarks',
    label: 'Remarks',
    type: 'textarea',
    placeholder: 'Enter remarks',
    colSpan: 4
  }
];

export const cafeteriaOrderConfig: FieldConfig[] = [
  {
    name: 'studentId',
    label: 'Student',
    type: 'select',
    placeholder: 'Select student',
    colSpan: 2
  },
  {
    name: 'staffId',
    label: 'Staff',
    type: 'select',
    placeholder: 'Select staff',
    colSpan: 2
  },
  {
    name: 'orderDate',
    label: 'Order Date',
    type: 'date',
    required: true,
    colSpan: 2
  },
  {
    name: 'totalAmount',
    label: 'Total Amount',
    type: 'input',
    placeholder: 'Enter total amount',
    required: true,
    colSpan: 2
  },
  {
    name: 'paymentMethod',
    label: 'Payment Method',
    type: 'select',
    options: [
      { label: 'Cash', value: 'cash' },
      { label: 'Bank Transfer', value: 'bank_transfer' },
      { label: 'Mobile Money', value: 'mobile_money' },
      { label: 'Card', value: 'card' },
      { label: 'Cheque', value: 'cheque' }
    ],
    colSpan: 2
  },
  {
    name: 'paymentStatus',
    label: 'Payment Status',
    type: 'select',
    options: [
      { label: 'Pending', value: 'pending' },
      { label: 'Paid', value: 'paid' },
      { label: 'Overdue', value: 'overdue' },
      { label: 'Partial', value: 'partial' }
    ],
    colSpan: 2
  },
  {
    name: 'orderStatus',
    label: 'Order Status',
    type: 'select',
    options: [
      { label: 'Pending', value: 'pending' },
      { label: 'Preparing', value: 'preparing' },
      { label: 'Ready', value: 'ready' },
      { label: 'Served', value: 'served' },
      { label: 'Cancelled', value: 'cancelled' }
    ],
    colSpan: 2
  },
  {
    name: 'specialInstructions',
    label: 'Special Instructions',
    type: 'textarea',
    placeholder: 'Enter special instructions',
    colSpan: 4
  },
  {
    name: 'servedBy',
    label: 'Served By',
    type: 'select',
    placeholder: 'Select server',
    colSpan: 2
  },
  {
    name: 'servedAt',
    label: 'Served At',
    type: 'date',
    colSpan: 2
  }
];

