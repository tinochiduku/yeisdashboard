import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Yeis Dashboard API',
      version: '1.0.0',
      description: 'API documentation for the Yeis Dashboard project.'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            email: { type: 'string', format: 'email' },
            role: {
              type: 'string',
              enum: [
                'admin',
                'teacher',
                'student',
                'parent',
                'bursary',
                'staff'
              ]
            },
            isActive: { type: 'boolean' },
            lastLogin: { type: 'string', format: 'date-time' },
            emailVerified: { type: 'boolean' },
            twoFactorEnabled: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewUser: {
          type: 'object',
          required: ['email', 'passwordHash', 'role'],
          properties: {
            email: { type: 'string', format: 'email' },
            passwordHash: { type: 'string' },
            role: {
              type: 'string',
              enum: [
                'admin',
                'teacher',
                'student',
                'parent',
                'bursary',
                'staff'
              ]
            }
          }
        },
        School: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            address: { type: 'string' },
            phone: { type: 'string' },
            email: { type: 'string', format: 'email' },
            website: { type: 'string' },
            logo: { type: 'string' },
            establishedYear: { type: 'integer' },
            motto: { type: 'string' },
            principalName: { type: 'string' },
            registrationNumber: { type: 'string' },
            isActive: { type: 'boolean' },
            settings: { type: 'object' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewSchool: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string' },
            address: { type: 'string' },
            phone: { type: 'string' },
            email: { type: 'string', format: 'email' },
            website: { type: 'string' },
            logo: { type: 'string' },
            establishedYear: { type: 'integer' },
            motto: { type: 'string' },
            principalName: { type: 'string' },
            registrationNumber: { type: 'string' },
            isActive: { type: 'boolean' },
            settings: { type: 'object' }
          }
        },
        Student: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            classId: { type: 'string', format: 'uuid' },
            admissionNumber: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            middleName: { type: 'string' },
            dateOfBirth: { type: 'string', format: 'date' },
            gender: { type: 'string', enum: ['male', 'female', 'other'] },
            bloodGroup: {
              type: 'string',
              enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
            },
            address: { type: 'string' },
            phone: { type: 'string' },
            email: { type: 'string', format: 'email' },
            nationality: { type: 'string' },
            religion: { type: 'string' },
            category: { type: 'string' },
            admissionDate: { type: 'string', format: 'date' },
            previousSchool: { type: 'string' },
            medicalInfo: { type: 'object' },
            specialNeeds: { type: 'string' },
            photo: { type: 'string' },
            documents: { type: 'object' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewStudent: {
          type: 'object',
          required: [
            'firstName',
            'lastName',
            'dateOfBirth',
            'gender',
            'admissionDate'
          ],
          properties: {
            userId: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            classId: { type: 'string', format: 'uuid' },
            admissionNumber: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            middleName: { type: 'string' },
            dateOfBirth: { type: 'string', format: 'date' },
            gender: { type: 'string', enum: ['male', 'female', 'other'] },
            bloodGroup: {
              type: 'string',
              enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
            },
            address: { type: 'string' },
            phone: { type: 'string' },
            email: { type: 'string', format: 'email' },
            nationality: { type: 'string' },
            religion: { type: 'string' },
            category: { type: 'string' },
            admissionDate: { type: 'string', format: 'date' },
            previousSchool: { type: 'string' },
            medicalInfo: { type: 'object' },
            specialNeeds: { type: 'string' },
            photo: { type: 'string' },
            documents: { type: 'object' },
            isActive: { type: 'boolean' }
          }
        },
        Staff: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            employeeId: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            middleName: { type: 'string' },
            dateOfBirth: { type: 'string', format: 'date' },
            gender: { type: 'string', enum: ['male', 'female', 'other'] },
            phone: { type: 'string' },
            alternatePhone: { type: 'string' },
            email: { type: 'string', format: 'email' },
            address: { type: 'string' },
            nationalId: { type: 'string' },
            bloodGroup: {
              type: 'string',
              enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
            },
            maritalStatus: {
              type: 'string',
              enum: ['single', 'married', 'divorced', 'widowed']
            },
            emergencyContact: { type: 'object' },
            qualification: { type: 'object' },
            experience: { type: 'object' },
            staffType: {
              type: 'string',
              enum: ['teaching', 'non_teaching', 'administrative', 'support']
            },
            department: { type: 'string' },
            designation: { type: 'string' },
            joiningDate: { type: 'string', format: 'date' },
            leavingDate: { type: 'string', format: 'date' },
            salary: { type: 'number', format: 'decimal' },
            bankDetails: { type: 'object' },
            documents: { type: 'object' },
            photo: { type: 'string' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewStaff: {
          type: 'object',
          required: ['firstName', 'lastName', 'staffType', 'joiningDate'],
          properties: {
            userId: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            employeeId: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            middleName: { type: 'string' },
            dateOfBirth: { type: 'string', format: 'date' },
            gender: { type: 'string', enum: ['male', 'female', 'other'] },
            phone: { type: 'string' },
            alternatePhone: { type: 'string' },
            email: { type: 'string', format: 'email' },
            address: { type: 'string' },
            nationalId: { type: 'string' },
            bloodGroup: {
              type: 'string',
              enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
            },
            maritalStatus: {
              type: 'string',
              enum: ['single', 'married', 'divorced', 'widowed']
            },
            emergencyContact: { type: 'object' },
            qualification: { type: 'object' },
            experience: { type: 'object' },
            staffType: {
              type: 'string',
              enum: ['teaching', 'non_teaching', 'administrative', 'support']
            },
            department: { type: 'string' },
            designation: { type: 'string' },
            joiningDate: { type: 'string', format: 'date' },
            leavingDate: { type: 'string', format: 'date' },
            salary: { type: 'number', format: 'decimal' },
            bankDetails: { type: 'object' },
            documents: { type: 'object' },
            photo: { type: 'string' },
            isActive: { type: 'boolean' }
          }
        },
        Parent: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            relationship: { type: 'string' },
            phone: { type: 'string' },
            alternatePhone: { type: 'string' },
            email: { type: 'string', format: 'email' },
            occupation: { type: 'string' },
            workAddress: { type: 'string' },
            annualIncome: { type: 'number', format: 'decimal' },
            education: { type: 'string' },
            address: { type: 'string' },
            nationalId: { type: 'string' },
            photo: { type: 'string' },
            isEmergencyContact: { type: 'boolean' },
            isPrimaryContact: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewParent: {
          type: 'object',
          required: ['firstName', 'lastName', 'relationship'],
          properties: {
            userId: { type: 'string', format: 'uuid' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            relationship: { type: 'string' },
            phone: { type: 'string' },
            alternatePhone: { type: 'string' },
            email: { type: 'string', format: 'email' },
            occupation: { type: 'string' },
            workAddress: { type: 'string' },
            annualIncome: { type: 'number', format: 'decimal' },
            education: { type: 'string' },
            address: { type: 'string' },
            nationalId: { type: 'string' },
            photo: { type: 'string' },
            isEmergencyContact: { type: 'boolean' },
            isPrimaryContact: { type: 'boolean' }
          }
        },
        Class: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            level: { type: 'integer' },
            section: { type: 'string' },
            capacity: { type: 'integer' },
            room: { type: 'string' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewClass: {
          type: 'object',
          required: ['name', 'level'],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            level: { type: 'integer' },
            section: { type: 'string' },
            capacity: { type: 'integer' },
            room: { type: 'string' },
            isActive: { type: 'boolean' }
          }
        },
        Subject: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            code: { type: 'string' },
            description: { type: 'string' },
            credits: { type: 'integer' },
            isCore: { type: 'boolean' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewSubject: {
          type: 'object',
          required: ['name'],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            code: { type: 'string' },
            description: { type: 'string' },
            credits: { type: 'integer' },
            isCore: { type: 'boolean' },
            isActive: { type: 'boolean' }
          }
        },
        AcademicYear: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewAcademicYear: {
          type: 'object',
          required: ['name', 'startDate', 'endDate'],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
            isActive: { type: 'boolean' }
          }
        },
        Term: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            academicYearId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            type: { type: 'string', enum: ['first', 'second', 'third'] },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewTerm: {
          type: 'object',
          required: ['name', 'type', 'startDate', 'endDate'],
          properties: {
            academicYearId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            type: { type: 'string', enum: ['first', 'second', 'third'] },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
            isActive: { type: 'boolean' }
          }
        },
        StudentParent: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            studentId: { type: 'string', format: 'uuid' },
            parentId: { type: 'string', format: 'uuid' },
            relationship: { type: 'string' },
            isGuardian: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        NewStudentParent: {
          type: 'object',
          required: ['studentId', 'parentId', 'relationship'],
          properties: {
            studentId: { type: 'string', format: 'uuid' },
            parentId: { type: 'string', format: 'uuid' },
            relationship: { type: 'string' },
            isGuardian: { type: 'boolean' }
          }
        },
        Sibling: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            studentId: { type: 'string', format: 'uuid' },
            siblingId: { type: 'string', format: 'uuid' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        NewSibling: {
          type: 'object',
          required: ['studentId', 'siblingId'],
          properties: {
            studentId: { type: 'string', format: 'uuid' },
            siblingId: { type: 'string', format: 'uuid' }
          }
        },
        ClassSubject: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            classId: { type: 'string', format: 'uuid' },
            subjectId: { type: 'string', format: 'uuid' },
            teacherId: { type: 'string', format: 'uuid' },
            academicYearId: { type: 'string', format: 'uuid' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        NewClassSubject: {
          type: 'object',
          required: ['classId', 'subjectId', 'teacherId', 'academicYearId'],
          properties: {
            classId: { type: 'string', format: 'uuid' },
            subjectId: { type: 'string', format: 'uuid' },
            teacherId: { type: 'string', format: 'uuid' },
            academicYearId: { type: 'string', format: 'uuid' },
            isActive: { type: 'boolean' }
          }
        },
        Timetable: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            classId: { type: 'string', format: 'uuid' },
            subjectId: { type: 'string', format: 'uuid' },
            teacherId: { type: 'string', format: 'uuid' },
            dayOfWeek: {
              type: 'string',
              enum: [
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
                'sunday'
              ]
            },
            startTime: { type: 'string' },
            endTime: { type: 'string' },
            room: { type: 'string' },
            academicYearId: { type: 'string', format: 'uuid' },
            termId: { type: 'string', format: 'uuid' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        NewTimetable: {
          type: 'object',
          required: [
            'classId',
            'subjectId',
            'teacherId',
            'dayOfWeek',
            'startTime',
            'endTime'
          ],
          properties: {
            classId: { type: 'string', format: 'uuid' },
            subjectId: { type: 'string', format: 'uuid' },
            teacherId: { type: 'string', format: 'uuid' },
            dayOfWeek: {
              type: 'string',
              enum: [
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
                'sunday'
              ]
            },
            startTime: { type: 'string' },
            endTime: { type: 'string' },
            room: { type: 'string' },
            academicYearId: { type: 'string', format: 'uuid' },
            termId: { type: 'string', format: 'uuid' },
            isActive: { type: 'boolean' }
          }
        },
        Attendance: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            studentId: { type: 'string', format: 'uuid' },
            classId: { type: 'string', format: 'uuid' },
            subjectId: { type: 'string', format: 'uuid' },
            teacherId: { type: 'string', format: 'uuid' },
            date: { type: 'string', format: 'date' },
            status: {
              type: 'string',
              enum: ['present', 'absent', 'late', 'excused']
            },
            remarks: { type: 'string' },
            markedBy: { type: 'string', format: 'uuid' },
            markedAt: { type: 'string', format: 'date-time' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        NewAttendance: {
          type: 'object',
          required: ['studentId', 'classId', 'date', 'status'],
          properties: {
            studentId: { type: 'string', format: 'uuid' },
            classId: { type: 'string', format: 'uuid' },
            subjectId: { type: 'string', format: 'uuid' },
            teacherId: { type: 'string', format: 'uuid' },
            date: { type: 'string', format: 'date' },
            status: {
              type: 'string',
              enum: ['present', 'absent', 'late', 'excused']
            },
            remarks: { type: 'string' },
            markedBy: { type: 'string', format: 'uuid' }
          }
        },
        Exam: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            academicYearId: { type: 'string', format: 'uuid' },
            termId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            type: {
              type: 'string',
              enum: [
                'quiz',
                'test',
                'midterm',
                'final',
                'assignment',
                'project'
              ]
            },
            description: { type: 'string' },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
            maxMarks: { type: 'integer' },
            passMarks: { type: 'integer' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewExam: {
          type: 'object',
          required: ['name', 'type', 'startDate', 'endDate'],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            academicYearId: { type: 'string', format: 'uuid' },
            termId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            type: {
              type: 'string',
              enum: [
                'quiz',
                'test',
                'midterm',
                'final',
                'assignment',
                'project'
              ]
            },
            description: { type: 'string' },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
            maxMarks: { type: 'integer' },
            passMarks: { type: 'integer' },
            isActive: { type: 'boolean' }
          }
        },
        ExamSubject: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            examId: { type: 'string', format: 'uuid' },
            subjectId: { type: 'string', format: 'uuid' },
            classId: { type: 'string', format: 'uuid' },
            maxMarks: { type: 'integer' },
            passMarks: { type: 'integer' },
            examDate: { type: 'string', format: 'date' },
            examTime: { type: 'string' },
            duration: { type: 'integer' },
            room: { type: 'string' },
            instructions: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        NewExamSubject: {
          type: 'object',
          required: ['examId', 'subjectId', 'classId', 'maxMarks', 'passMarks'],
          properties: {
            examId: { type: 'string', format: 'uuid' },
            subjectId: { type: 'string', format: 'uuid' },
            classId: { type: 'string', format: 'uuid' },
            maxMarks: { type: 'integer' },
            passMarks: { type: 'integer' },
            examDate: { type: 'string', format: 'date' },
            examTime: { type: 'string' },
            duration: { type: 'integer' },
            room: { type: 'string' },
            instructions: { type: 'string' }
          }
        },
        Grade: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            studentId: { type: 'string', format: 'uuid' },
            examId: { type: 'string', format: 'uuid' },
            subjectId: { type: 'string', format: 'uuid' },
            marksObtained: { type: 'number', format: 'decimal' },
            maxMarks: { type: 'integer' },
            grade: { type: 'string', enum: ['A', 'B', 'C', 'D', 'F'] },
            percentage: { type: 'number', format: 'decimal' },
            remarks: { type: 'string' },
            teacherId: { type: 'string', format: 'uuid' },
            enteredBy: { type: 'string', format: 'uuid' },
            enteredAt: { type: 'string', format: 'date-time' },
            isPublished: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewGrade: {
          type: 'object',
          required: ['studentId', 'examId', 'subjectId', 'maxMarks'],
          properties: {
            studentId: { type: 'string', format: 'uuid' },
            examId: { type: 'string', format: 'uuid' },
            subjectId: { type: 'string', format: 'uuid' },
            marksObtained: { type: 'number', format: 'decimal' },
            maxMarks: { type: 'integer' },
            grade: { type: 'string', enum: ['A', 'B', 'C', 'D', 'F'] },
            percentage: { type: 'number', format: 'decimal' },
            remarks: { type: 'string' },
            teacherId: { type: 'string', format: 'uuid' },
            enteredBy: { type: 'string', format: 'uuid' },
            isPublished: { type: 'boolean' }
          }
        },
        FeeStructure: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            classId: { type: 'string', format: 'uuid' },
            academicYearId: { type: 'string', format: 'uuid' },
            feeType: {
              type: 'string',
              enum: [
                'tuition',
                'hostel',
                'transport',
                'activity',
                'exam',
                'library',
                'lab',
                'other'
              ]
            },
            name: { type: 'string' },
            amount: { type: 'number', format: 'decimal' },
            dueDate: { type: 'string', format: 'date' },
            isOptional: { type: 'boolean' },
            description: { type: 'string' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewFeeStructure: {
          type: 'object',
          required: [
            'schoolId',
            'classId',
            'academicYearId',
            'feeType',
            'name',
            'amount'
          ],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            classId: { type: 'string', format: 'uuid' },
            academicYearId: { type: 'string', format: 'uuid' },
            feeType: {
              type: 'string',
              enum: [
                'tuition',
                'hostel',
                'transport',
                'activity',
                'exam',
                'library',
                'lab',
                'other'
              ]
            },
            name: { type: 'string' },
            amount: { type: 'number', format: 'decimal' },
            dueDate: { type: 'string', format: 'date' },
            isOptional: { type: 'boolean' },
            description: { type: 'string' },
            isActive: { type: 'boolean' }
          }
        },
        FeePayment: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            studentId: { type: 'string', format: 'uuid' },
            feeStructureId: { type: 'string', format: 'uuid' },
            amount: { type: 'number', format: 'decimal' },
            paymentDate: { type: 'string', format: 'date' },
            paymentMethod: {
              type: 'string',
              enum: ['cash', 'bank_transfer', 'mobile_money', 'card', 'cheque']
            },
            transactionId: { type: 'string' },
            receiptNumber: { type: 'string' },
            remarks: { type: 'string' },
            status: {
              type: 'string',
              enum: ['pending', 'paid', 'overdue', 'partial']
            },
            processedBy: { type: 'string', format: 'uuid' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewFeePayment: {
          type: 'object',
          required: [
            'studentId',
            'feeStructureId',
            'amount',
            'paymentDate',
            'paymentMethod'
          ],
          properties: {
            studentId: { type: 'string', format: 'uuid' },
            feeStructureId: { type: 'string', format: 'uuid' },
            amount: { type: 'number', format: 'decimal' },
            paymentDate: { type: 'string', format: 'date' },
            paymentMethod: {
              type: 'string',
              enum: ['cash', 'bank_transfer', 'mobile_money', 'card', 'cheque']
            },
            transactionId: { type: 'string' },
            receiptNumber: { type: 'string' },
            remarks: { type: 'string' },
            status: {
              type: 'string',
              enum: ['pending', 'paid', 'overdue', 'partial']
            },
            processedBy: { type: 'string', format: 'uuid' }
          }
        },
        Event: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            description: { type: 'string' },
            type: {
              type: 'string',
              enum: [
                'academic',
                'sports',
                'cultural',
                'meeting',
                'holiday',
                'exam'
              ]
            },
            startDate: { type: 'string', format: 'date-time' },
            endDate: { type: 'string', format: 'date-time' },
            location: { type: 'string' },
            organizer: { type: 'string' },
            isPublic: { type: 'boolean' },
            requiresRegistration: { type: 'boolean' },
            maxParticipants: { type: 'integer' },
            createdBy: { type: 'string', format: 'uuid' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewEvent: {
          type: 'object',
          required: ['schoolId', 'title', 'type', 'startDate', 'endDate'],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            description: { type: 'string' },
            type: {
              type: 'string',
              enum: [
                'academic',
                'sports',
                'cultural',
                'meeting',
                'holiday',
                'exam'
              ]
            },
            startDate: { type: 'string', format: 'date-time' },
            endDate: { type: 'string', format: 'date-time' },
            location: { type: 'string' },
            organizer: { type: 'string' },
            isPublic: { type: 'boolean' },
            requiresRegistration: { type: 'boolean' },
            maxParticipants: { type: 'integer' },
            createdBy: { type: 'string', format: 'uuid' }
          }
        },
        Announcement: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            content: { type: 'string' },
            priority: { type: 'string' },
            targetAudience: { type: 'object' },
            isActive: { type: 'boolean' },
            publishDate: { type: 'string', format: 'date-time' },
            expiryDate: { type: 'string', format: 'date-time' },
            attachments: { type: 'object' },
            createdBy: { type: 'string', format: 'uuid' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewAnnouncement: {
          type: 'object',
          required: ['schoolId', 'title', 'content'],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            content: { type: 'string' },
            priority: { type: 'string' },
            targetAudience: { type: 'object' },
            isActive: { type: 'boolean' },
            publishDate: { type: 'string', format: 'date-time' },
            expiryDate: { type: 'string', format: 'date-time' },
            attachments: { type: 'object' },
            createdBy: { type: 'string', format: 'uuid' }
          }
        },
        Communication: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            senderId: { type: 'string', format: 'uuid' },
            recipientType: { type: 'string' },
            recipientIds: { type: 'object' },
            type: {
              type: 'string',
              enum: ['sms', 'email', 'whatsapp', 'call', 'notification']
            },
            subject: { type: 'string' },
            message: { type: 'string' },
            attachments: { type: 'object' },
            status: { type: 'string' },
            scheduledAt: { type: 'string', format: 'date-time' },
            sentAt: { type: 'string', format: 'date-time' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        NewCommunication: {
          type: 'object',
          required: [
            'schoolId',
            'senderId',
            'recipientType',
            'type',
            'message'
          ],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            senderId: { type: 'string', format: 'uuid' },
            recipientType: { type: 'string' },
            recipientIds: { type: 'object' },
            type: {
              type: 'string',
              enum: ['sms', 'email', 'whatsapp', 'call', 'notification']
            },
            subject: { type: 'string' },
            message: { type: 'string' },
            attachments: { type: 'object' },
            status: { type: 'string' },
            scheduledAt: { type: 'string', format: 'date-time' }
          }
        },
        Hostel: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            type: { type: 'string' },
            capacity: { type: 'integer' },
            wardenId: { type: 'string', format: 'uuid' },
            address: { type: 'string' },
            facilities: { type: 'object' },
            rules: { type: 'string' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewHostel: {
          type: 'object',
          required: ['schoolId', 'name', 'type', 'capacity'],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            type: { type: 'string' },
            capacity: { type: 'integer' },
            wardenId: { type: 'string', format: 'uuid' },
            address: { type: 'string' },
            facilities: { type: 'object' },
            rules: { type: 'string' },
            isActive: { type: 'boolean' }
          }
        },
        HostelRoom: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            hostelId: { type: 'string', format: 'uuid' },
            roomNumber: { type: 'string' },
            capacity: { type: 'integer' },
            currentOccupancy: { type: 'integer' },
            facilities: { type: 'object' },
            monthlyFee: { type: 'number', format: 'decimal' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewHostelRoom: {
          type: 'object',
          required: ['hostelId', 'roomNumber', 'capacity'],
          properties: {
            hostelId: { type: 'string', format: 'uuid' },
            roomNumber: { type: 'string' },
            capacity: { type: 'integer' },
            currentOccupancy: { type: 'integer' },
            facilities: { type: 'object' },
            monthlyFee: { type: 'number', format: 'decimal' },
            isActive: { type: 'boolean' }
          }
        },
        HostelAllocation: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            studentId: { type: 'string', format: 'uuid' },
            hostelId: { type: 'string', format: 'uuid' },
            roomId: { type: 'string', format: 'uuid' },
            academicYearId: { type: 'string', format: 'uuid' },
            allocationDate: { type: 'string', format: 'date' },
            vacationDate: { type: 'string', format: 'date' },
            monthlyFee: { type: 'number', format: 'decimal' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewHostelAllocation: {
          type: 'object',
          required: [
            'studentId',
            'hostelId',
            'roomId',
            'academicYearId',
            'allocationDate'
          ],
          properties: {
            studentId: { type: 'string', format: 'uuid' },
            hostelId: { type: 'string', format: 'uuid' },
            roomId: { type: 'string', format: 'uuid' },
            academicYearId: { type: 'string', format: 'uuid' },
            allocationDate: { type: 'string', format: 'date' },
            vacationDate: { type: 'string', format: 'date' },
            monthlyFee: { type: 'number', format: 'decimal' },
            isActive: { type: 'boolean' }
          }
        },
        InventoryCategory: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            description: { type: 'string' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        NewInventoryCategory: {
          type: 'object',
          required: ['schoolId', 'name'],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            description: { type: 'string' },
            isActive: { type: 'boolean' }
          }
        },
        InventoryItem: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            categoryId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            description: { type: 'string' },
            sku: { type: 'string' },
            quantity: { type: 'integer' },
            minQuantity: { type: 'integer' },
            unitPrice: { type: 'number', format: 'decimal' },
            location: { type: 'string' },
            supplier: { type: 'string' },
            purchaseDate: { type: 'string', format: 'date' },
            warrantyExpiry: { type: 'string', format: 'date' },
            condition: { type: 'string' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewInventoryItem: {
          type: 'object',
          required: ['schoolId', 'categoryId', 'name'],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            categoryId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            description: { type: 'string' },
            sku: { type: 'string' },
            quantity: { type: 'integer' },
            minQuantity: { type: 'integer' },
            unitPrice: { type: 'number', format: 'decimal' },
            location: { type: 'string' },
            supplier: { type: 'string' },
            purchaseDate: { type: 'string', format: 'date' },
            warrantyExpiry: { type: 'string', format: 'date' },
            condition: { type: 'string' },
            isActive: { type: 'boolean' }
          }
        },
        Visitor: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            phone: { type: 'string' },
            email: { type: 'string', format: 'email' },
            idType: { type: 'string' },
            idNumber: { type: 'string' },
            address: { type: 'string' },
            photo: { type: 'string' },
            purpose: { type: 'string' },
            personToMeet: { type: 'string' },
            visitDate: { type: 'string', format: 'date' },
            checkInTime: { type: 'string', format: 'date-time' },
            checkOutTime: { type: 'string', format: 'date-time' },
            approvedBy: { type: 'string', format: 'uuid' },
            remarks: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        NewVisitor: {
          type: 'object',
          required: ['schoolId', 'name', 'visitDate'],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            phone: { type: 'string' },
            email: { type: 'string', format: 'email' },
            idType: { type: 'string' },
            idNumber: { type: 'string' },
            address: { type: 'string' },
            photo: { type: 'string' },
            purpose: { type: 'string' },
            personToMeet: { type: 'string' },
            visitDate: { type: 'string', format: 'date' },
            checkInTime: { type: 'string', format: 'date-time' },
            checkOutTime: { type: 'string', format: 'date-time' },
            approvedBy: { type: 'string', format: 'uuid' },
            remarks: { type: 'string' }
          }
        },
        Leave: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            applicantId: { type: 'string', format: 'uuid' },
            applicantType: { type: 'string' },
            leaveType: {
              type: 'string',
              enum: [
                'sick',
                'annual',
                'maternity',
                'paternity',
                'emergency',
                'study'
              ]
            },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
            days: { type: 'integer' },
            reason: { type: 'string' },
            status: { type: 'string' },
            approvedBy: { type: 'string', format: 'uuid' },
            approvedAt: { type: 'string', format: 'date-time' },
            rejectionReason: { type: 'string' },
            attachments: { type: 'object' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewLeave: {
          type: 'object',
          required: [
            'schoolId',
            'applicantId',
            'applicantType',
            'leaveType',
            'startDate',
            'endDate',
            'days',
            'reason'
          ],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            applicantId: { type: 'string', format: 'uuid' },
            applicantType: { type: 'string' },
            leaveType: {
              type: 'string',
              enum: [
                'sick',
                'annual',
                'maternity',
                'paternity',
                'emergency',
                'study'
              ]
            },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
            days: { type: 'integer' },
            reason: { type: 'string' },
            status: { type: 'string' },
            approvedBy: { type: 'string', format: 'uuid' },
            rejectionReason: { type: 'string' },
            attachments: { type: 'object' }
          }
        },
        DisciplinaryRecord: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            studentId: { type: 'string', format: 'uuid' },
            incidentDate: { type: 'string', format: 'date' },
            incidentType: { type: 'string' },
            description: { type: 'string' },
            actionTaken: { type: 'string' },
            reportedBy: { type: 'string', format: 'uuid' },
            severity: { type: 'string' },
            status: { type: 'string' },
            parentNotified: { type: 'boolean' },
            followUpRequired: { type: 'boolean' },
            followUpDate: { type: 'string', format: 'date' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewDisciplinaryRecord: {
          type: 'object',
          required: [
            'studentId',
            'incidentDate',
            'incidentType',
            'description'
          ],
          properties: {
            studentId: { type: 'string', format: 'uuid' },
            incidentDate: { type: 'string', format: 'date' },
            incidentType: { type: 'string' },
            description: { type: 'string' },
            actionTaken: { type: 'string' },
            reportedBy: { type: 'string', format: 'uuid' },
            severity: { type: 'string' },
            status: { type: 'string' },
            parentNotified: { type: 'boolean' },
            followUpRequired: { type: 'boolean' },
            followUpDate: { type: 'string', format: 'date' }
          }
        },
        TransportRoute: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            routeName: { type: 'string' },
            routeCode: { type: 'string' },
            startPoint: { type: 'string' },
            endPoint: { type: 'string' },
            distance: { type: 'number', format: 'decimal' },
            estimatedTime: { type: 'integer' },
            stops: { type: 'object' },
            monthlyFee: { type: 'number', format: 'decimal' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewTransportRoute: {
          type: 'object',
          required: ['schoolId', 'routeName'],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            routeName: { type: 'string' },
            routeCode: { type: 'string' },
            startPoint: { type: 'string' },
            endPoint: { type: 'string' },
            distance: { type: 'number', format: 'decimal' },
            estimatedTime: { type: 'integer' },
            stops: { type: 'object' },
            monthlyFee: { type: 'number', format: 'decimal' },
            isActive: { type: 'boolean' }
          }
        },
        TransportVehicle: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            vehicleNumber: { type: 'string' },
            vehicleType: { type: 'string' },
            capacity: { type: 'integer' },
            driverId: { type: 'string', format: 'uuid' },
            conductorId: { type: 'string', format: 'uuid' },
            routeId: { type: 'string', format: 'uuid' },
            insuranceExpiry: { type: 'string', format: 'date' },
            permitExpiry: { type: 'string', format: 'date' },
            fitnessExpiry: { type: 'string', format: 'date' },
            lastServiceDate: { type: 'string', format: 'date' },
            nextServiceDate: { type: 'string', format: 'date' },
            fuelType: { type: 'string' },
            averageMileage: { type: 'number', format: 'decimal' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewTransportVehicle: {
          type: 'object',
          required: ['schoolId', 'vehicleNumber', 'vehicleType', 'capacity'],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            vehicleNumber: { type: 'string' },
            vehicleType: { type: 'string' },
            capacity: { type: 'integer' },
            driverId: { type: 'string', format: 'uuid' },
            conductorId: { type: 'string', format: 'uuid' },
            routeId: { type: 'string', format: 'uuid' },
            insuranceExpiry: { type: 'string', format: 'date' },
            permitExpiry: { type: 'string', format: 'date' },
            fitnessExpiry: { type: 'string', format: 'date' },
            lastServiceDate: { type: 'string', format: 'date' },
            nextServiceDate: { type: 'string', format: 'date' },
            fuelType: { type: 'string' },
            averageMileage: { type: 'number', format: 'decimal' },
            isActive: { type: 'boolean' }
          }
        },
        TransportAllocation: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            studentId: { type: 'string', format: 'uuid' },
            routeId: { type: 'string', format: 'uuid' },
            vehicleId: { type: 'string', format: 'uuid' },
            academicYearId: { type: 'string', format: 'uuid' },
            pickupPoint: { type: 'string' },
            dropPoint: { type: 'string' },
            monthlyFee: { type: 'number', format: 'decimal' },
            allocationDate: { type: 'string', format: 'date' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewTransportAllocation: {
          type: 'object',
          required: [
            'studentId',
            'routeId',
            'vehicleId',
            'academicYearId',
            'allocationDate'
          ],
          properties: {
            studentId: { type: 'string', format: 'uuid' },
            routeId: { type: 'string', format: 'uuid' },
            vehicleId: { type: 'string', format: 'uuid' },
            academicYearId: { type: 'string', format: 'uuid' },
            pickupPoint: { type: 'string' },
            dropPoint: { type: 'string' },
            monthlyFee: { type: 'number', format: 'decimal' },
            allocationDate: { type: 'string', format: 'date' },
            isActive: { type: 'boolean' }
          }
        },
        LibraryBook: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            isbn: { type: 'string' },
            title: { type: 'string' },
            author: { type: 'string' },
            publisher: { type: 'string' },
            publishYear: { type: 'integer' },
            category: { type: 'string' },
            subCategory: { type: 'string' },
            language: { type: 'string' },
            pages: { type: 'integer' },
            edition: { type: 'string' },
            price: { type: 'number', format: 'decimal' },
            location: { type: 'string' },
            totalCopies: { type: 'integer' },
            availableCopies: { type: 'integer' },
            description: { type: 'string' },
            coverImage: { type: 'string' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewLibraryBook: {
          type: 'object',
          required: ['schoolId', 'title'],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            isbn: { type: 'string' },
            title: { type: 'string' },
            author: { type: 'string' },
            publisher: { type: 'string' },
            publishYear: { type: 'integer' },
            category: { type: 'string' },
            subCategory: { type: 'string' },
            language: { type: 'string' },
            pages: { type: 'integer' },
            edition: { type: 'string' },
            price: { type: 'number', format: 'decimal' },
            location: { type: 'string' },
            totalCopies: { type: 'integer' },
            availableCopies: { type: 'integer' },
            description: { type: 'string' },
            coverImage: { type: 'string' },
            isActive: { type: 'boolean' }
          }
        },
        LibraryIssue: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            bookId: { type: 'string', format: 'uuid' },
            studentId: { type: 'string', format: 'uuid' },
            staffId: { type: 'string', format: 'uuid' },
            issueDate: { type: 'string', format: 'date' },
            dueDate: { type: 'string', format: 'date' },
            returnDate: { type: 'string', format: 'date' },
            fineAmount: { type: 'number', format: 'decimal' },
            finePaid: { type: 'boolean' },
            bookCondition: { type: 'string' },
            remarks: { type: 'string' },
            issuedBy: { type: 'string', format: 'uuid' },
            returnedBy: { type: 'string', format: 'uuid' },
            status: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewLibraryIssue: {
          type: 'object',
          required: ['bookId', 'issueDate', 'dueDate'],
          properties: {
            bookId: { type: 'string', format: 'uuid' },
            studentId: { type: 'string', format: 'uuid' },
            staffId: { type: 'string', format: 'uuid' },
            issueDate: { type: 'string', format: 'date' },
            dueDate: { type: 'string', format: 'date' },
            returnDate: { type: 'string', format: 'date' },
            fineAmount: { type: 'number', format: 'decimal' },
            finePaid: { type: 'boolean' },
            bookCondition: { type: 'string' },
            remarks: { type: 'string' },
            issuedBy: { type: 'string', format: 'uuid' },
            returnedBy: { type: 'string', format: 'uuid' },
            status: { type: 'string' }
          }
        },
        CafeteriaMenu: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            itemName: { type: 'string' },
            category: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number', format: 'decimal' },
            ingredients: { type: 'object' },
            allergens: { type: 'object' },
            nutritionalInfo: { type: 'object' },
            isVegetarian: { type: 'boolean' },
            isVegan: { type: 'boolean' },
            isAvailable: { type: 'boolean' },
            availableDays: { type: 'object' },
            image: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewCafeteriaMenu: {
          type: 'object',
          required: ['schoolId', 'itemName', 'price'],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            itemName: { type: 'string' },
            category: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number', format: 'decimal' },
            ingredients: { type: 'object' },
            allergens: { type: 'object' },
            nutritionalInfo: { type: 'object' },
            isVegetarian: { type: 'boolean' },
            isVegan: { type: 'boolean' },
            isAvailable: { type: 'boolean' },
            availableDays: { type: 'object' },
            image: { type: 'string' }
          }
        },
        CafeteriaOrder: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            studentId: { type: 'string', format: 'uuid' },
            staffId: { type: 'string', format: 'uuid' },
            orderDate: { type: 'string', format: 'date' },
            orderTime: { type: 'string', format: 'date-time' },
            items: { type: 'object' },
            totalAmount: { type: 'number', format: 'decimal' },
            paymentMethod: {
              type: 'string',
              enum: ['cash', 'bank_transfer', 'mobile_money', 'card', 'cheque']
            },
            paymentStatus: {
              type: 'string',
              enum: ['pending', 'paid', 'overdue', 'partial']
            },
            orderStatus: { type: 'string' },
            specialInstructions: { type: 'string' },
            servedBy: { type: 'string', format: 'uuid' },
            servedAt: { type: 'string', format: 'date-time' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewCafeteriaOrder: {
          type: 'object',
          required: ['orderDate', 'items', 'totalAmount'],
          properties: {
            studentId: { type: 'string', format: 'uuid' },
            staffId: { type: 'string', format: 'uuid' },
            orderDate: { type: 'string', format: 'date' },
            items: { type: 'object' },
            totalAmount: { type: 'number', format: 'decimal' },
            paymentMethod: {
              type: 'string',
              enum: ['cash', 'bank_transfer', 'mobile_money', 'card', 'cheque']
            },
            paymentStatus: {
              type: 'string',
              enum: ['pending', 'paid', 'overdue', 'partial']
            },
            orderStatus: { type: 'string' },
            specialInstructions: { type: 'string' },
            servedBy: { type: 'string', format: 'uuid' }
          }
        },
        MedicalRecord: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            studentId: { type: 'string', format: 'uuid' },
            staffId: { type: 'string', format: 'uuid' },
            recordDate: { type: 'string', format: 'date' },
            recordType: { type: 'string' },
            symptoms: { type: 'string' },
            diagnosis: { type: 'string' },
            treatment: { type: 'string' },
            prescription: { type: 'string' },
            allergies: { type: 'object' },
            medications: { type: 'object' },
            vitals: { type: 'object' },
            followUpRequired: { type: 'boolean' },
            followUpDate: { type: 'string', format: 'date' },
            doctorName: { type: 'string' },
            nurseId: { type: 'string', format: 'uuid' },
            parentNotified: { type: 'boolean' },
            attachments: { type: 'object' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewMedicalRecord: {
          type: 'object',
          required: ['recordDate', 'recordType'],
          properties: {
            studentId: { type: 'string', format: 'uuid' },
            staffId: { type: 'string', format: 'uuid' },
            recordDate: { type: 'string', format: 'date' },
            recordType: { type: 'string' },
            symptoms: { type: 'string' },
            diagnosis: { type: 'string' },
            treatment: { type: 'string' },
            prescription: { type: 'string' },
            allergies: { type: 'object' },
            medications: { type: 'object' },
            vitals: { type: 'object' },
            followUpRequired: { type: 'boolean' },
            followUpDate: { type: 'string', format: 'date' },
            doctorName: { type: 'string' },
            nurseId: { type: 'string', format: 'uuid' },
            parentNotified: { type: 'boolean' },
            attachments: { type: 'object' }
          }
        },
        Activity: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            type: { type: 'string' },
            description: { type: 'string' },
            coachId: { type: 'string', format: 'uuid' },
            maxParticipants: { type: 'integer' },
            currentParticipants: { type: 'integer' },
            schedule: { type: 'object' },
            venue: { type: 'string' },
            fee: { type: 'number', format: 'decimal' },
            requirements: { type: 'string' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewActivity: {
          type: 'object',
          required: ['schoolId', 'name', 'type'],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            type: { type: 'string' },
            description: { type: 'string' },
            coachId: { type: 'string', format: 'uuid' },
            maxParticipants: { type: 'integer' },
            currentParticipants: { type: 'integer' },
            schedule: { type: 'object' },
            venue: { type: 'string' },
            fee: { type: 'number', format: 'decimal' },
            requirements: { type: 'string' },
            isActive: { type: 'boolean' }
          }
        },
        ActivityParticipant: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            activityId: { type: 'string', format: 'uuid' },
            studentId: { type: 'string', format: 'uuid' },
            academicYearId: { type: 'string', format: 'uuid' },
            joinDate: { type: 'string', format: 'date' },
            leaveDate: { type: 'string', format: 'date' },
            performance: { type: 'string' },
            achievements: { type: 'object' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewActivityParticipant: {
          type: 'object',
          required: ['activityId', 'studentId', 'academicYearId', 'joinDate'],
          properties: {
            activityId: { type: 'string', format: 'uuid' },
            studentId: { type: 'string', format: 'uuid' },
            academicYearId: { type: 'string', format: 'uuid' },
            joinDate: { type: 'string', format: 'date' },
            leaveDate: { type: 'string', format: 'date' },
            performance: { type: 'string' },
            achievements: { type: 'object' },
            isActive: { type: 'boolean' }
          }
        },
        Competition: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            type: { type: 'string' },
            level: { type: 'string' },
            description: { type: 'string' },
            organizer: { type: 'string' },
            venue: { type: 'string' },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
            registrationDeadline: { type: 'string', format: 'date' },
            fee: { type: 'number', format: 'decimal' },
            maxParticipants: { type: 'integer' },
            eligibilityCriteria: { type: 'string' },
            prizes: { type: 'object' },
            rules: { type: 'string' },
            coordinatorId: { type: 'string', format: 'uuid' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewCompetition: {
          type: 'object',
          required: [
            'schoolId',
            'name',
            'type',
            'level',
            'startDate',
            'endDate'
          ],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            type: { type: 'string' },
            level: { type: 'string' },
            description: { type: 'string' },
            organizer: { type: 'string' },
            venue: { type: 'string' },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
            registrationDeadline: { type: 'string', format: 'date' },
            fee: { type: 'number', format: 'decimal' },
            maxParticipants: { type: 'integer' },
            eligibilityCriteria: { type: 'string' },
            prizes: { type: 'object' },
            rules: { type: 'string' },
            coordinatorId: { type: 'string', format: 'uuid' },
            isActive: { type: 'boolean' }
          }
        },
        CompetitionParticipant: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            competitionId: { type: 'string', format: 'uuid' },
            studentId: { type: 'string', format: 'uuid' },
            registrationDate: { type: 'string', format: 'date' },
            participationStatus: { type: 'string' },
            result: { type: 'string' },
            position: { type: 'integer' },
            score: { type: 'number', format: 'decimal' },
            certificate: { type: 'string' },
            remarks: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewCompetitionParticipant: {
          type: 'object',
          required: ['competitionId', 'studentId', 'registrationDate'],
          properties: {
            competitionId: { type: 'string', format: 'uuid' },
            studentId: { type: 'string', format: 'uuid' },
            registrationDate: { type: 'string', format: 'date' },
            participationStatus: { type: 'string' },
            result: { type: 'string' },
            position: { type: 'integer' },
            score: { type: 'number', format: 'decimal' },
            certificate: { type: 'string' },
            remarks: { type: 'string' }
          }
        },
        Certificate: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            studentId: { type: 'string', format: 'uuid' },
            type: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            issueDate: { type: 'string', format: 'date' },
            validUntil: { type: 'string', format: 'date' },
            certificateNumber: { type: 'string' },
            templateId: { type: 'string' },
            digitalCertificate: { type: 'string' },
            issuedBy: { type: 'string', format: 'uuid' },
            verificationCode: { type: 'string' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewCertificate: {
          type: 'object',
          required: ['studentId', 'type', 'title', 'issueDate'],
          properties: {
            studentId: { type: 'string', format: 'uuid' },
            type: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            issueDate: { type: 'string', format: 'date' },
            validUntil: { type: 'string', format: 'date' },
            certificateNumber: { type: 'string' },
            templateId: { type: 'string' },
            digitalCertificate: { type: 'string' },
            issuedBy: { type: 'string', format: 'uuid' },
            verificationCode: { type: 'string' },
            isActive: { type: 'boolean' }
          }
        },
        MaintenanceRequest: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            description: { type: 'string' },
            location: { type: 'string' },
            priority: { type: 'string' },
            category: { type: 'string' },
            reportedBy: { type: 'string', format: 'uuid' },
            assignedTo: { type: 'string', format: 'uuid' },
            status: { type: 'string' },
            estimatedCost: { type: 'number', format: 'decimal' },
            actualCost: { type: 'number', format: 'decimal' },
            startDate: { type: 'string', format: 'date' },
            completionDate: { type: 'string', format: 'date' },
            attachments: { type: 'object' },
            remarks: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewMaintenanceRequest: {
          type: 'object',
          required: ['schoolId', 'title', 'description'],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            description: { type: 'string' },
            location: { type: 'string' },
            priority: { type: 'string' },
            category: { type: 'string' },
            reportedBy: { type: 'string', format: 'uuid' },
            assignedTo: { type: 'string', format: 'uuid' },
            status: { type: 'string' },
            estimatedCost: { type: 'number', format: 'decimal' },
            actualCost: { type: 'number', format: 'decimal' },
            startDate: { type: 'string', format: 'date' },
            completionDate: { type: 'string', format: 'date' },
            attachments: { type: 'object' },
            remarks: { type: 'string' }
          }
        },
        Vendor: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            contactPerson: { type: 'string' },
            phone: { type: 'string' },
            email: { type: 'string', format: 'email' },
            address: { type: 'string' },
            category: { type: 'string' },
            taxNumber: { type: 'string' },
            bankDetails: { type: 'object' },
            contractDetails: { type: 'object' },
            rating: { type: 'number', format: 'decimal' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewVendor: {
          type: 'object',
          required: ['schoolId', 'name'],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            contactPerson: { type: 'string' },
            phone: { type: 'string' },
            email: { type: 'string', format: 'email' },
            address: { type: 'string' },
            category: { type: 'string' },
            taxNumber: { type: 'string' },
            bankDetails: { type: 'object' },
            contractDetails: { type: 'object' },
            rating: { type: 'number', format: 'decimal' },
            isActive: { type: 'boolean' }
          }
        },
        PurchaseOrder: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            vendorId: { type: 'string', format: 'uuid' },
            orderNumber: { type: 'string' },
            orderDate: { type: 'string', format: 'date' },
            expectedDelivery: { type: 'string', format: 'date' },
            actualDelivery: { type: 'string', format: 'date' },
            items: { type: 'object' },
            totalAmount: { type: 'number', format: 'decimal' },
            taxAmount: { type: 'number', format: 'decimal' },
            discountAmount: { type: 'number', format: 'decimal' },
            finalAmount: { type: 'number', format: 'decimal' },
            status: { type: 'string' },
            approvedBy: { type: 'string', format: 'uuid' },
            receivedBy: { type: 'string', format: 'uuid' },
            remarks: { type: 'string' },
            attachments: { type: 'object' },
            createdBy: { type: 'string', format: 'uuid' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewPurchaseOrder: {
          type: 'object',
          required: [
            'schoolId',
            'vendorId',
            'orderNumber',
            'orderDate',
            'totalAmount',
            'finalAmount'
          ],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            vendorId: { type: 'string', format: 'uuid' },
            orderNumber: { type: 'string' },
            orderDate: { type: 'string', format: 'date' },
            expectedDelivery: { type: 'string', format: 'date' },
            actualDelivery: { type: 'string', format: 'date' },
            items: { type: 'object' },
            totalAmount: { type: 'number', format: 'decimal' },
            taxAmount: { type: 'number', format: 'decimal' },
            discountAmount: { type: 'number', format: 'decimal' },
            finalAmount: { type: 'number', format: 'decimal' },
            status: { type: 'string' },
            approvedBy: { type: 'string', format: 'uuid' },
            receivedBy: { type: 'string', format: 'uuid' },
            remarks: { type: 'string' },
            attachments: { type: 'object' },
            createdBy: { type: 'string', format: 'uuid' }
          }
        },
        PayrollStructure: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            staffId: { type: 'string', format: 'uuid' },
            basicSalary: { type: 'number', format: 'decimal' },
            allowances: { type: 'object' },
            deductions: { type: 'object' },
            grossSalary: { type: 'number', format: 'decimal' },
            netSalary: { type: 'number', format: 'decimal' },
            effectiveFrom: { type: 'string', format: 'date' },
            effectiveTo: { type: 'string', format: 'date' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewPayrollStructure: {
          type: 'object',
          required: [
            'schoolId',
            'staffId',
            'basicSalary',
            'grossSalary',
            'netSalary',
            'effectiveFrom'
          ],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            staffId: { type: 'string', format: 'uuid' },
            basicSalary: { type: 'number', format: 'decimal' },
            allowances: { type: 'object' },
            deductions: { type: 'object' },
            grossSalary: { type: 'number', format: 'decimal' },
            netSalary: { type: 'number', format: 'decimal' },
            effectiveFrom: { type: 'string', format: 'date' },
            effectiveTo: { type: 'string', format: 'date' },
            isActive: { type: 'boolean' }
          }
        },
        PayrollRecord: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            staffId: { type: 'string', format: 'uuid' },
            payrollStructureId: { type: 'string', format: 'uuid' },
            payrollMonth: { type: 'string' },
            workingDays: { type: 'integer' },
            presentDays: { type: 'integer' },
            leaveDays: { type: 'integer' },
            overtime: { type: 'number', format: 'decimal' },
            overtimeRate: { type: 'number', format: 'decimal' },
            bonuses: { type: 'number', format: 'decimal' },
            penalties: { type: 'number', format: 'decimal' },
            grossSalary: { type: 'number', format: 'decimal' },
            totalDeductions: { type: 'number', format: 'decimal' },
            netSalary: { type: 'number', format: 'decimal' },
            paymentDate: { type: 'string', format: 'date' },
            paymentMethod: {
              type: 'string',
              enum: ['cash', 'bank_transfer', 'mobile_money', 'card', 'cheque']
            },
            paymentReference: { type: 'string' },
            status: { type: 'string' },
            generatedBy: { type: 'string', format: 'uuid' },
            approvedBy: { type: 'string', format: 'uuid' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewPayrollRecord: {
          type: 'object',
          required: [
            'schoolId',
            'staffId',
            'payrollStructureId',
            'payrollMonth',
            'workingDays',
            'presentDays',
            'grossSalary',
            'totalDeductions',
            'netSalary'
          ],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            staffId: { type: 'string', format: 'uuid' },
            payrollStructureId: { type: 'string', format: 'uuid' },
            payrollMonth: { type: 'string' },
            workingDays: { type: 'integer' },
            presentDays: { type: 'integer' },
            leaveDays: { type: 'integer' },
            overtime: { type: 'number', format: 'decimal' },
            overtimeRate: { type: 'number', format: 'decimal' },
            bonuses: { type: 'number', format: 'decimal' },
            penalties: { type: 'number', format: 'decimal' },
            grossSalary: { type: 'number', format: 'decimal' },
            totalDeductions: { type: 'number', format: 'decimal' },
            netSalary: { type: 'number', format: 'decimal' },
            paymentDate: { type: 'string', format: 'date' },
            paymentMethod: {
              type: 'string',
              enum: ['cash', 'bank_transfer', 'mobile_money', 'card', 'cheque']
            },
            paymentReference: { type: 'string' },
            status: { type: 'string' },
            generatedBy: { type: 'string', format: 'uuid' },
            approvedBy: { type: 'string', format: 'uuid' }
          }
        },
        ExpenseCategory: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            description: { type: 'string' },
            budgetLimit: { type: 'number', format: 'decimal' },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewExpenseCategory: {
          type: 'object',
          required: ['schoolId', 'name'],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            description: { type: 'string' },
            budgetLimit: { type: 'number', format: 'decimal' },
            isActive: { type: 'boolean' }
          }
        },
        Expense: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            categoryId: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            description: { type: 'string' },
            amount: { type: 'number', format: 'decimal' },
            expenseDate: { type: 'string', format: 'date' },
            paymentMethod: {
              type: 'string',
              enum: ['cash', 'bank_transfer', 'mobile_money', 'card', 'cheque']
            },
            vendorId: { type: 'string', format: 'uuid' },
            receipts: { type: 'object' },
            status: { type: 'string' },
            submittedBy: { type: 'string', format: 'uuid' },
            approvedBy: { type: 'string', format: 'uuid' },
            approvalDate: { type: 'string', format: 'date' },
            rejectionReason: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewExpense: {
          type: 'object',
          required: [
            'schoolId',
            'categoryId',
            'title',
            'amount',
            'expenseDate',
            'paymentMethod'
          ],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            categoryId: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            description: { type: 'string' },
            amount: { type: 'number', format: 'decimal' },
            expenseDate: { type: 'string', format: 'date' },
            paymentMethod: {
              type: 'string',
              enum: ['cash', 'bank_transfer', 'mobile_money', 'card', 'cheque']
            },
            vendorId: { type: 'string', format: 'uuid' },
            receipts: { type: 'object' },
            status: { type: 'string' },
            submittedBy: { type: 'string', format: 'uuid' },
            approvedBy: { type: 'string', format: 'uuid' },
            approvalDate: { type: 'string', format: 'date' },
            rejectionReason: { type: 'string' }
          }
        },
        SystemSetting: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            settingKey: { type: 'string' },
            settingValue: { type: 'string' },
            dataType: { type: 'string' },
            category: { type: 'string' },
            description: { type: 'string' },
            isEditable: { type: 'boolean' },
            updatedBy: { type: 'string', format: 'uuid' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        NewSystemSetting: {
          type: 'object',
          required: ['schoolId', 'settingKey'],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            settingKey: { type: 'string' },
            settingValue: { type: 'string' },
            dataType: { type: 'string' },
            category: { type: 'string' },
            description: { type: 'string' },
            isEditable: { type: 'boolean' },
            updatedBy: { type: 'string', format: 'uuid' }
          }
        },
        AuditLog: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
            action: { type: 'string' },
            tableName: { type: 'string' },
            recordId: { type: 'string', format: 'uuid' },
            oldValues: { type: 'object' },
            newValues: { type: 'object' },
            ipAddress: { type: 'string' },
            userAgent: { type: 'string' },
            timestamp: { type: 'string', format: 'date-time' }
          }
        },
        NewAuditLog: {
          type: 'object',
          required: ['schoolId', 'userId', 'action'],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
            action: { type: 'string' },
            tableName: { type: 'string' },
            recordId: { type: 'string', format: 'uuid' },
            oldValues: { type: 'object' },
            newValues: { type: 'object' },
            ipAddress: { type: 'string' },
            userAgent: { type: 'string' }
          }
        },
        Notification: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            message: { type: 'string' },
            type: { type: 'string' },
            isRead: { type: 'boolean' },
            actionUrl: { type: 'string' },
            expiryDate: { type: 'string', format: 'date-time' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        NewNotification: {
          type: 'object',
          required: ['schoolId', 'userId', 'title', 'message', 'type'],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            message: { type: 'string' },
            type: { type: 'string' },
            isRead: { type: 'boolean' },
            actionUrl: { type: 'string' },
            expiryDate: { type: 'string', format: 'date-time' }
          }
        },
        FileStorage: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            schoolId: { type: 'string', format: 'uuid' },
            fileName: { type: 'string' },
            originalName: { type: 'string' },
            filePath: { type: 'string' },
            fileSize: { type: 'integer' },
            mimeType: { type: 'string' },
            uploadedBy: { type: 'string', format: 'uuid' },
            isPublic: { type: 'boolean' },
            tags: { type: 'object' },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        NewFileStorage: {
          type: 'object',
          required: [
            'schoolId',
            'fileName',
            'originalName',
            'filePath',
            'fileSize',
            'mimeType',
            'uploadedBy'
          ],
          properties: {
            schoolId: { type: 'string', format: 'uuid' },
            fileName: { type: 'string' },
            originalName: { type: 'string' },
            filePath: { type: 'string' },
            fileSize: { type: 'integer' },
            mimeType: { type: 'string' },
            uploadedBy: { type: 'string', format: 'uuid' },
            isPublic: { type: 'boolean' },
            tags: { type: 'object' }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/app/api/**/*.ts', './src/app/api/**/**/*.ts']
};

export const swaggerSpec = swaggerJsdoc(options);
