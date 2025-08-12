import { Icons } from '@/components/icons';

const _sidebar = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    slug: 'dashboard',
    icon: <Icons.dashboard className='size-4' />,
    access: ['student', 'staff', 'admin'],
    children: []
  },
  {
    title: 'Academic',
    href: '/academic',
    slug: 'academic',
    icon: <Icons.academic className='size-4' />,
    access: ['staff', 'admin'],
    children: [
      {
        title: 'Classes',
        href: '/academic/classes',
        slug: 'classes',
        icon: <Icons.user className='size-4' />,
        children: []
      },
      {
        title: 'Subjects',
        href: '/academic/subjects',
        slug: 'subjects',
        icon: <Icons.library className='size-4' />,
        children: []
      },
      {
        title: 'Academic Years',
        href: '/academic/years',
        slug: 'years',
        icon: <Icons.calendar className='size-4' />,
        children: []
      },
      {
        title: 'Terms',
        href: '/academic/terms',
        slug: 'terms',
        icon: <Icons.calendar className='size-4' />,
        children: []
      },
      {
        title: 'Timetable',
        href: '/academic/timetable',
        slug: 'timetable',
        icon: <Icons.kanban className='size-4' />,
        children: []
      },
      {
        title: 'Class Subjects',
        href: '/academic/class-subjects',
        slug: 'class-subjects',
        icon: <Icons.examinations className='size-4' />,
        children: []
      }
    ]
  },
  {
    title: 'Students',
    href: '/students',
    slug: 'students',
    icon: <Icons.students className='size-4' />,
    access: ['staff', 'admin'],
    children: [
      {
        title: 'All Students',
        href: '/students',
        slug: 'students-list',
        icon: <Icons.students className='size-4' />,
        children: []
      },
      {
        title: 'Admissions',
        href: '/students/admissions',
        slug: 'admissions',
        icon: <Icons.visitors className='size-4' />,
        children: []
      },
      {
        title: 'Attendance',
        href: '/students/attendance',
        slug: 'attendance',
        icon: <Icons.clipboardCheck className='size-4' />,
        children: []
      },
      {
        title: 'Parents',
        href: '/students/parents',
        slug: 'parents',
        icon: <Icons.user className='size-4' />,
        children: []
      },
      {
        title: 'Student Parents',
        href: '/students/student-parents',
        slug: 'student-parents',
        icon: <Icons.employee className='size-4' />,
        children: []
      },
      {
        title: 'Siblings',
        href: '/students/siblings',
        slug: 'siblings',
        icon: <Icons.user className='size-4' />,
        children: []
      }
    ]
  },
  {
    title: 'Staff',
    href: '/staff',
    slug: 'staff',
    icon: <Icons.staff className='size-4' />,
    access: ['admin'],
    children: [
      {
        title: 'All Staff',
        href: '/staff',
        slug: 'staff-list',
        icon: <Icons.staff className='size-4' />,
        children: []
      },
      {
        title: 'Teachers',
        href: '/staff/teachers',
        slug: 'teachers',
        icon: <Icons.user className='size-4' />,
        children: []
      },
      {
        title: 'Non-Teaching',
        href: '/staff/non-teaching',
        slug: 'non-teaching',
        icon: <Icons.user className='size-4' />,
        children: []
      },
      {
        title: 'Attendance',
        href: '/staff/attendance',
        slug: 'staff-attendance',
        icon: <Icons.clipboardCheck className='size-4' />,
        children: []
      }
    ]
  },
  {
    title: 'Examinations',
    href: '/examinations',
    slug: 'examinations',
    icon: <Icons.examinations className='size-4' />,
    access: ['staff', 'admin'],
    children: [
      {
        title: 'Exams',
        href: '/examinations/exams',
        slug: 'exams',
        icon: <Icons.examinations className='size-4' />,
        children: []
      },
      {
        title: 'Exam Subjects',
        href: '/examinations/exam-subjects',
        slug: 'exam-subjects',
        icon: <Icons.library className='size-4' />,
        children: []
      },
      {
        title: 'Grades',
        href: '/examinations/grades',
        slug: 'grades',
        icon: <Icons.certificates className='size-4' />,
        children: []
      },
      {
        title: 'Results',
        href: '/examinations/results',
        slug: 'results',
        icon: <Icons.post className='size-4' />,
        children: []
      }
    ]
  },
  {
    title: 'Finance',
    href: '/finance',
    slug: 'finance',
    icon: <Icons.finance className='size-4' />,
    access: ['admin'],
    children: [
      {
        title: 'Fee Structure',
        href: '/finance/fee-structure',
        slug: 'fee-structure',
        icon: <Icons.billing className='size-4' />,
        children: []
      },
      {
        title: 'Fee Payments',
        href: '/finance/fee-payments',
        slug: 'fee-payments',
        icon: <Icons.cash className='size-4' />,
        children: []
      },
      {
        title: 'Expenses',
        href: '/finance/expenses',
        slug: 'expenses',
        icon: <Icons.wallet className='size-4' />,
        children: []
      },
      {
        title: 'Expense Categories',
        href: '/finance/expense-categories',
        slug: 'expense-categories',
        icon: <Icons.category className='size-4' />,
        children: []
      },
      {
        title: 'Payroll',
        href: '/finance/payroll',
        slug: 'payroll',
        icon: <Icons.billing className='size-4' />,
        children: [
          {
            title: 'Payroll Structure',
            href: '/finance/payroll/structure',
            slug: 'payroll-structure',
            icon: <Icons.settings className='size-4' />,
            children: []
          },
          {
            title: 'Payroll Records',
            href: '/finance/payroll/records',
            slug: 'payroll-records',
            icon: <Icons.post className='size-4' />,
            children: []
          }
        ]
      }
    ]
  },
  {
    title: 'Hostel',
    href: '/hostel',
    slug: 'hostel',
    icon: <Icons.hostel className='size-4' />,
    access: ['staff', 'admin'],
    children: [
      {
        title: 'Hostels',
        href: '/hostel/hostels',
        slug: 'hostels-list',
        icon: <Icons.hostel className='size-4' />,
        children: []
      },
      {
        title: 'Rooms',
        href: '/hostel/rooms',
        slug: 'rooms',
        icon: <Icons.bed className='size-4' />,
        children: []
      },
      {
        title: 'Allocations',
        href: '/hostel/allocations',
        slug: 'allocations',
        icon: <Icons.userCheck className='size-4' />,
        children: []
      }
    ]
  },
  {
    title: 'Transport',
    href: '/transport',
    slug: 'transport',
    icon: <Icons.transport className='size-4' />,
    access: ['staff', 'admin'],
    children: [
      {
        title: 'Routes',
        href: '/transport/routes',
        slug: 'routes',
        icon: <Icons.map className='size-4' />,
        children: []
      },
      {
        title: 'Vehicles',
        href: '/transport/vehicles',
        slug: 'vehicles',
        icon: <Icons.transport className='size-4' />,
        children: []
      },
      {
        title: 'Allocations',
        href: '/transport/allocations',
        slug: 'transport-allocations',
        icon: <Icons.userCheck className='size-4' />,
        children: []
      }
    ]
  },
  {
    title: 'Library',
    href: '/library',
    slug: 'library',
    icon: <Icons.library className='size-4' />,
    access: ['student', 'staff', 'admin'],
    children: [
      {
        title: 'Books',
        href: '/library/books',
        slug: 'books',
        icon: <Icons.library className='size-4' />,
        children: []
      },
      {
        title: 'Issues',
        href: '/library/issues',
        slug: 'issues',
        icon: <Icons.examinations className='size-4' />,
        children: []
      }
    ]
  },
  {
    title: 'Cafeteria',
    href: '/cafeteria',
    slug: 'cafeteria',
    icon: <Icons.cafeteria className='size-4' />,
    access: ['student', 'staff', 'admin'],
    children: [
      {
        title: 'Menu',
        href: '/cafeteria/menu',
        slug: 'menu',
        icon: <Icons.menu className='size-4' />,
        children: []
      },
      {
        title: 'Orders',
        href: '/cafeteria/orders',
        slug: 'orders',
        icon: <Icons.shoppingCart className='size-4' />,
        children: []
      }
    ]
  },
  {
    title: 'Health',
    href: '/health',
    slug: 'health',
    icon: <Icons.health className='size-4' />,
    access: ['staff', 'admin'],
    children: [
      {
        title: 'Medical Records',
        href: '/health/medical-records',
        slug: 'medical-records',
        icon: <Icons.heartbeat className='size-4' />,
        children: []
      }
    ]
  },
  {
    title: 'Activities',
    href: '/activities',
    slug: 'activities',
    icon: <Icons.activities className='size-4' />,
    access: ['student', 'staff', 'admin'],
    children: [
      {
        title: 'Extracurricular',
        href: '/activities/extracurricular',
        slug: 'extracurricular',
        icon: <Icons.activities className='size-4' />,
        children: []
      },
      {
        title: 'Participants',
        href: '/activities/participants',
        slug: 'participants',
        icon: <Icons.students className='size-4' />,
        children: []
      },
      {
        title: 'Competitions',
        href: '/activities/competitions',
        slug: 'competitions',
        icon: <Icons.medal className='size-4' />,
        children: []
      },
      {
        title: 'Competition Participants',
        href: '/activities/competition-participants',
        slug: 'competition-participants',
        icon: <Icons.userCheck className='size-4' />,
        children: []
      }
    ]
  },
  {
    title: 'Certificates',
    href: '/certificates',
    slug: 'certificates',
    icon: <Icons.certificates className='size-4' />,
    access: ['student', 'staff', 'admin'],
    children: []
  },
  {
    title: 'Communications',
    href: '/communications',
    slug: 'communications',
    icon: <Icons.communications className='size-4' />,
    access: ['student', 'staff', 'admin'],
    children: [
      {
        title: 'Contacts',
        href: '/communications/contacts',
        slug: 'contacts',
        icon: <Icons.addressBook className='size-4' />,
        children: []
      },
      {
        title: 'Newsletter',
        href: '/communications/newsletter',
        slug: 'newsletter',
        icon: <Icons.news className='size-4' />,
        children: []
      },
      {
        title: 'Messages',
        href: '/communications/messages',
        slug: 'messages',
        icon: <Icons.communications className='size-4' />,
        children: []
      },
      {
        title: 'Announcements',
        href: '/communications/announcements',
        slug: 'announcements',
        icon: <Icons.bullhorn className='size-4' />,
        children: []
      }
    ]
  },
  {
    title: 'Events',
    href: '/events',
    slug: 'events',
    icon: <Icons.events className='size-4' />,
    access: ['student', 'staff', 'admin'],
    children: []
  },
  {
    title: 'Leave Management',
    href: '/leave',
    slug: 'leave',
    icon: <Icons.leave className='size-4' />,
    access: ['student', 'staff', 'admin'],
    children: [
      {
        title: 'Student Leave',
        href: '/leave/student',
        slug: 'student-leave',
        icon: <Icons.leave className='size-4' />,
        children: []
      },
      {
        title: 'Staff Leave',
        href: '/leave/staff',
        slug: 'staff-leave',
        icon: <Icons.leave className='size-4' />,
        children: []
      }
    ]
  },
  {
    title: 'Disciplinary',
    href: '/disciplinary',
    slug: 'disciplinary',
    icon: <Icons.disciplinary className='size-4' />,
    access: ['staff', 'admin'],
    children: []
  },
  {
    title: 'Inventory',
    href: '/inventory',
    slug: 'inventory',
    icon: <Icons.inventory className='size-4' />,
    access: ['staff', 'admin'],
    children: [
      {
        title: 'Categories',
        href: '/inventory/categories',
        slug: 'inventory-categories',
        icon: <Icons.category className='size-4' />,
        children: []
      },
      {
        title: 'Items',
        href: '/inventory/items',
        slug: 'inventory-items',
        icon: <Icons.inventory className='size-4' />,
        children: []
      }
    ]
  },
  {
    title: 'Maintenance',
    href: '/maintenance',
    slug: 'maintenance',
    icon: <Icons.maintenance className='size-4' />,
    access: ['admin'],
    children: [
      {
        title: 'Requests',
        href: '/maintenance/requests',
        slug: 'maintenance-requests',
        icon: <Icons.maintenance className='size-4' />,
        children: []
      }
    ]
  },
  {
    title: 'Visitors',
    href: '/visitors',
    slug: 'visitors',
    icon: <Icons.visitors className='size-4' />,
    access: ['staff', 'admin'],
    children: []
  },
  {
    title: 'Vendors',
    href: '/vendors',
    slug: 'vendors',
    icon: <Icons.vendors className='size-4' />,
    access: ['admin'],
    children: []
  },
  {
    title: 'Purchase Orders',
    href: '/purchase-orders',
    slug: 'purchase-orders',
    icon: <Icons.purchaseOrders className='size-4' />,
    access: ['admin'],
    children: []
  },
  {
    title: 'System',
    href: '/system',
    slug: 'system',
    icon: <Icons.system className='size-4' />,
    access: ['admin'],
    children: [
      {
        title: 'Settings',
        href: '/system/settings',
        slug: 'settings',
        icon: <Icons.settings className='size-4' />,
        children: []
      },
      {
        title: 'Users',
        href: '/system/users',
        slug: 'users',
        icon: <Icons.students className='size-4' />,
        children: []
      },
      {
        title: 'Audit Logs',
        href: '/system/audit-logs',
        slug: 'audit-logs',
        icon: <Icons.post className='size-4' />,
        children: []
      },
      {
        title: 'Notifications',
        href: '/system/notifications',
        slug: 'notifications',
        icon: <Icons.bell className='size-4' />,
        children: []
      },
      {
        title: 'File Storage',
        href: '/system/file-storage',
        slug: 'file-storage',
        icon: <Icons.folder className='size-4' />,
        children: []
      }
    ]
  }
];
export default _sidebar;
