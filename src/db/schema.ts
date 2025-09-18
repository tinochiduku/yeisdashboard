import {
  pgTable,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
  date,
  uuid,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const userRole = pgEnum("user_role", [
  "admin",
  "teacher",
  "student",
  "parent",
  "bursary",
  "staff",
]);
export const gender = pgEnum("gender", ["male", "female", "other"]);
export const bloodGroup = pgEnum("blood_group", [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
]);
export const maritalStatus = pgEnum("marital_status", [
  "single",
  "married",
  "divorced",
  "widowed",
]);
export const attendanceStatus = pgEnum("attendance_status", [
  "present",
  "absent",
  "late",
  "excused",
]);
export const paymentStatus = pgEnum("payment_status", [
  "pending",
  "paid",
  "overdue",
  "partial",
]);
export const paymentMethod = pgEnum("payment_method", [
  "cash",
  "bank_transfer",
  "mobile_money",
  "card",
  "cheque",
]);
export const examType = pgEnum("exam_type", [
  "quiz",
  "test",
  "midterm",
  "final",
  "assignment",
  "project",
]);
export const gradeScale = pgEnum("grade_scale", ["A", "B", "C", "D", "F"]);
export const termType = pgEnum("term_type", ["first", "second", "third"]);
export const dayOfWeek = pgEnum("day_of_week", [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);
export const communicationType = pgEnum("communication_type", [
  "sms",
  "email",
  "whatsapp",
  "call",
  "notification",
]);
export const eventType = pgEnum("event_type", [
  "academic",
  "sports",
  "cultural",
  "meeting",
  "holiday",
  "exam",
]);
export const feeType = pgEnum("fee_type", [
  "tuition",
  "hostel",
  "transport",
  "activity",
  "exam",
  "library",
  "lab",
  "other",
]);
export const staffType = pgEnum("staff_type", [
  "teaching",
  "non_teaching",
  "administrative",
  "support",
]);
export const leaveType = pgEnum("leave_type", [
  "sick",
  "annual",
  "maternity",
  "paternity",
  "emergency",
  "study",
]);

// Core Tables

// Users table - Central authentication
export const users = pgTable("users", {
  id: varchar("id", { length: 255 }).unique(),
  userId: uuid("userId").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: userRole("role").notNull(),
  isActive: boolean("is_active").default(true),
  lastLogin: timestamp("last_login"),
  emailVerified: boolean("email_verified").default(false),
  twoFactorEnabled: boolean("two_factor_enabled").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// School Information
export const schools = pgTable("schools", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  address: text("address"),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 255 }),
  website: varchar("website", { length: 255 }),
  logo: varchar("logo", { length: 500 }),
  establishedYear: integer("established_year"),
  motto: text("motto"),
  principalName: varchar("principal_name", { length: 255 }),
  registrationNumber: varchar("registration_number", { length: 100 }),
  isActive: boolean("is_active").default(true),
  settings: jsonb("settings"), // School-specific configurations
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Academic Years
export const academicYears = pgTable("academic_years", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  name: varchar("name", { length: 100 }).notNull(), // e.g., "2024-2025"
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  isActive: boolean("is_active").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Terms/Semesters
export const terms = pgTable("terms", {
  id: uuid("id").primaryKey().defaultRandom(),
  academicYearId: uuid("academic_year_id").references(() => academicYears.id),
  name: varchar("name", { length: 100 }).notNull(),
  type: termType("type").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  isActive: boolean("is_active").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Classes/Grades
export const classes = pgTable("classes", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  name: varchar("name", { length: 100 }).notNull(), // e.g., "Grade 10A"
  level: integer("level").notNull(), // 1-12 or equivalent
  section: varchar("section", { length: 10 }), // A, B, C, etc.
  capacity: integer("capacity").default(30),
  room: varchar("room", { length: 50 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Subjects
export const subjects = pgTable("subjects", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  name: varchar("name", { length: 255 }).notNull(),
  code: varchar("code", { length: 20 }),
  description: text("description"),
  credits: integer("credits").default(1),
  isCore: boolean("is_core").default(false), // Core or elective
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Staff/Teachers
export const staff = pgTable("staff", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.userId),
  schoolId: uuid("school_id").references(() => schools.id),
  employeeId: varchar("employee_id", { length: 50 }).unique(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  middleName: varchar("middle_name", { length: 100 }),
  dateOfBirth: date("date_of_birth"),
  gender: gender("gender"),
  phone: varchar("phone", { length: 20 }),
  alternatePhone: varchar("alternate_phone", { length: 20 }),
  email: varchar("email", { length: 255 }),
  address: text("address"),
  nationalId: varchar("national_id", { length: 50 }),
  bloodGroup: bloodGroup("blood_group"),
  maritalStatus: maritalStatus("marital_status"),
  emergencyContact: jsonb("emergency_contact"),
  qualification: jsonb("qualification"),
  experience: jsonb("experience"),
  staffType: staffType("staff_type").notNull(),
  department: varchar("department", { length: 100 }),
  designation: varchar("designation", { length: 100 }),
  joiningDate: date("joining_date").notNull(),
  leavingDate: date("leaving_date"),
  salary: decimal("salary", { precision: 10, scale: 2 }),
  bankDetails: jsonb("bank_details"),
  documents: jsonb("documents"), // Store document URLs/paths
  photo: varchar("photo", { length: 500 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Students
export const students = pgTable("students", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.userId),
  schoolId: uuid("school_id").references(() => schools.id),
  classId: uuid("class_id").references(() => classes.id),
  admissionNumber: varchar("admission_number", { length: 50 }).unique(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  middleName: varchar("middle_name", { length: 100 }),
  dateOfBirth: date("date_of_birth").notNull(),
  gender: gender("gender").notNull(),
  bloodGroup: bloodGroup("blood_group"),
  address: text("address"),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 255 }),
  nationality: varchar("nationality", { length: 100 }),
  religion: varchar("religion", { length: 100 }),
  category: varchar("category", { length: 50 }), // General, SC, ST, OBC, etc.
  admissionDate: date("admission_date").notNull(),
  previousSchool: varchar("previous_school", { length: 255 }),
  medicalInfo: jsonb("medical_info"),
  specialNeeds: text("special_needs"),
  photo: varchar("photo", { length: 500 }),
  documents: jsonb("documents"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Parents/Guardians
export const parents = pgTable("parents", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.userId),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  relationship: varchar("relationship", { length: 50 }).notNull(), // Father, Mother, Guardian
  phone: varchar("phone", { length: 20 }),
  alternatePhone: varchar("alternate_phone", { length: 20 }),
  email: varchar("email", { length: 255 }),
  occupation: varchar("occupation", { length: 100 }),
  workAddress: text("work_address"),
  annualIncome: decimal("annual_income", { precision: 12, scale: 2 }),
  education: varchar("education", { length: 100 }),
  address: text("address"),
  nationalId: varchar("national_id", { length: 50 }),
  photo: varchar("photo", { length: 500 }),
  isEmergencyContact: boolean("is_emergency_contact").default(false),
  isPrimaryContact: boolean("is_primary_contact").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Student-Parent relationships
export const studentParents = pgTable("student_parents", {
  id: uuid("id").primaryKey().defaultRandom(),
  studentId: uuid("student_id").references(() => students.id),
  parentId: uuid("parent_id").references(() => parents.id),
  relationship: varchar("relationship", { length: 50 }).notNull(),
  isGuardian: boolean("is_guardian").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Sibling relationships
export const siblings = pgTable("siblings", {
  id: uuid("id").primaryKey().defaultRandom(),
  studentId: uuid("student_id").references(() => students.id),
  siblingId: uuid("sibling_id").references(() => students.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Class-Subject assignments
export const classSubjects = pgTable("class_subjects", {
  id: uuid("id").primaryKey().defaultRandom(),
  classId: uuid("class_id").references(() => classes.id),
  subjectId: uuid("subject_id").references(() => subjects.id),
  teacherId: uuid("teacher_id").references(() => staff.id),
  academicYearId: uuid("academic_year_id").references(() => academicYears.id),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Timetable
export const timetable = pgTable("timetable", {
  id: uuid("id").primaryKey().defaultRandom(),
  classId: uuid("class_id").references(() => classes.id),
  subjectId: uuid("subject_id").references(() => subjects.id),
  teacherId: uuid("teacher_id").references(() => staff.id),
  dayOfWeek: dayOfWeek("day_of_week").notNull(),
  startTime: varchar("start_time", { length: 10 }).notNull(), // HH:MM format
  endTime: varchar("end_time", { length: 10 }).notNull(),
  room: varchar("room", { length: 50 }),
  academicYearId: uuid("academic_year_id").references(() => academicYears.id),
  termId: uuid("term_id").references(() => terms.id),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Attendance
export const attendance = pgTable("attendance", {
  id: uuid("id").primaryKey().defaultRandom(),
  studentId: uuid("student_id").references(() => students.id),
  classId: uuid("class_id").references(() => classes.id),
  subjectId: uuid("subject_id").references(() => subjects.id),
  teacherId: uuid("teacher_id").references(() => staff.id),
  date: date("date").notNull(),
  status: attendanceStatus("status").notNull(),
  remarks: text("remarks"),
  markedBy: uuid("marked_by").references(() => users.userId),
  markedAt: timestamp("marked_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Exams
export const exams = pgTable("exams", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  academicYearId: uuid("academic_year_id").references(() => academicYears.id),
  termId: uuid("term_id").references(() => terms.id),
  name: varchar("name", { length: 255 }).notNull(),
  type: examType("type").notNull(),
  description: text("description"),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  maxMarks: integer("max_marks").default(100),
  passMarks: integer("pass_marks").default(35),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Exam Subjects
export const examSubjects = pgTable("exam_subjects", {
  id: uuid("id").primaryKey().defaultRandom(),
  examId: uuid("exam_id").references(() => exams.id),
  subjectId: uuid("subject_id").references(() => subjects.id),
  classId: uuid("class_id").references(() => classes.id),
  maxMarks: integer("max_marks").notNull(),
  passMarks: integer("pass_marks").notNull(),
  examDate: date("exam_date"),
  examTime: varchar("exam_time", { length: 20 }),
  duration: integer("duration"), // in minutes
  room: varchar("room", { length: 50 }),
  instructions: text("instructions"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Grades/Results
export const grades = pgTable("grades", {
  id: uuid("id").primaryKey().defaultRandom(),
  studentId: uuid("student_id").references(() => students.id),
  examId: uuid("exam_id").references(() => exams.id),
  subjectId: uuid("subject_id").references(() => subjects.id),
  marksObtained: decimal("marks_obtained", { precision: 5, scale: 2 }),
  maxMarks: integer("max_marks").notNull(),
  grade: gradeScale("grade"),
  percentage: decimal("percentage", { precision: 5, scale: 2 }),
  remarks: text("remarks"),
  teacherId: uuid("teacher_id").references(() => staff.id),
  enteredBy: uuid("entered_by").references(() => users.userId),
  enteredAt: timestamp("entered_at").defaultNow(),
  isPublished: boolean("is_published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Fee Structure
export const feeStructure = pgTable("fee_structure", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  classId: uuid("class_id").references(() => classes.id),
  academicYearId: uuid("academic_year_id").references(() => academicYears.id),
  feeType: feeType("fee_type").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  dueDate: date("due_date"),
  isOptional: boolean("is_optional").default(false),
  description: text("description"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Fee Payments
export const feePayments = pgTable("fee_payments", {
  id: uuid("id").primaryKey().defaultRandom(),
  studentId: uuid("student_id").references(() => students.id),
  feeStructureId: uuid("fee_structure_id").references(() => feeStructure.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  paymentDate: date("payment_date").notNull(),
  paymentMethod: paymentMethod("payment_method").notNull(),
  transactionId: varchar("transaction_id", { length: 255 }),
  receiptNumber: varchar("receipt_number", { length: 100 }),
  remarks: text("remarks"),
  status: paymentStatus("status").default("pending"),
  processedBy: uuid("processed_by").references(() => users.userId),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Events
export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  type: eventType("type").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  location: varchar("location", { length: 255 }),
  organizer: varchar("organizer", { length: 255 }),
  isPublic: boolean("is_public").default(true),
  requiresRegistration: boolean("requires_registration").default(false),
  maxParticipants: integer("max_participants"),
  createdBy: uuid("created_by").references(() => users.userId),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Announcements
export const announcements = pgTable("announcements", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  priority: varchar("priority", { length: 20 }).default("normal"), // low, normal, high, urgent
  targetAudience: jsonb("target_audience"), // roles, classes, etc.
  isActive: boolean("is_active").default(true),
  publishDate: timestamp("publish_date").defaultNow(),
  expiryDate: timestamp("expiry_date"),
  attachments: jsonb("attachments"),
  createdBy: uuid("created_by").references(() => users.userId),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Communications Log
export const communications = pgTable("communications", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  senderId: uuid("sender_id").references(() => users.userId),
  recipientType: varchar("recipient_type", { length: 50 }).notNull(), // individual, group, class, all
  recipientIds: jsonb("recipient_ids"), // Array of user IDs
  type: communicationType("type").notNull(),
  subject: varchar("subject", { length: 500 }),
  message: text("message").notNull(),
  attachments: jsonb("attachments"),
  status: varchar("status", { length: 50 }).default("sent"), // sent, delivered, failed
  scheduledAt: timestamp("scheduled_at"),
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Hostel Management
export const hostels = pgTable("hostels", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // boys, girls, mixed
  capacity: integer("capacity").notNull(),
  wardenId: uuid("warden_id").references(() => staff.id),
  address: text("address"),
  facilities: jsonb("facilities"),
  rules: text("rules"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Hostel Rooms
export const hostelRooms = pgTable("hostel_rooms", {
  id: uuid("id").primaryKey().defaultRandom(),
  hostelId: uuid("hostel_id").references(() => hostels.id),
  roomNumber: varchar("room_number", { length: 50 }).notNull(),
  capacity: integer("capacity").notNull(),
  currentOccupancy: integer("current_occupancy").default(0),
  facilities: jsonb("facilities"),
  monthlyFee: decimal("monthly_fee", { precision: 10, scale: 2 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Hostel Allocations
export const hostelAllocations = pgTable("hostel_allocations", {
  id: uuid("id").primaryKey().defaultRandom(),
  studentId: uuid("student_id").references(() => students.id),
  hostelId: uuid("hostel_id").references(() => hostels.id),
  roomId: uuid("room_id").references(() => hostelRooms.id),
  academicYearId: uuid("academic_year_id").references(() => academicYears.id),
  allocationDate: date("allocation_date").notNull(),
  vacationDate: date("vacation_date"),
  monthlyFee: decimal("monthly_fee", { precision: 10, scale: 2 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Inventory Management
export const inventoryCategories = pgTable("inventory_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const inventoryItems = pgTable("inventory_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  categoryId: uuid("category_id").references(() => inventoryCategories.id),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  sku: varchar("sku", { length: 100 }),
  quantity: integer("quantity").default(0),
  minQuantity: integer("min_quantity").default(0),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }),
  location: varchar("location", { length: 255 }),
  supplier: varchar("supplier", { length: 255 }),
  purchaseDate: date("purchase_date"),
  warrantyExpiry: date("warranty_expiry"),
  condition: varchar("condition", { length: 50 }).default("good"), // excellent, good, fair, poor
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Visitor Management
export const visitors = pgTable("visitors", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 255 }),
  idType: varchar("id_type", { length: 50 }),
  idNumber: varchar("id_number", { length: 100 }),
  address: text("address"),
  photo: varchar("photo", { length: 500 }),
  purpose: varchar("purpose", { length: 255 }),
  personToMeet: varchar("person_to_meet", { length: 255 }),
  visitDate: date("visit_date").notNull(),
  checkInTime: timestamp("check_in_time"),
  checkOutTime: timestamp("check_out_time"),
  approvedBy: uuid("approved_by").references(() => users.userId),
  remarks: text("remarks"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Leave Management
export const leaves = pgTable("leaves", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  applicantId: uuid("applicant_id").references(() => users.userId),
  applicantType: varchar("applicant_type", { length: 20 }).notNull(), // staff, student
  leaveType: leaveType("leave_type").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  days: integer("days").notNull(),
  reason: text("reason").notNull(),
  status: varchar("status", { length: 20 }).default("pending"), // pending, approved, rejected
  approvedBy: uuid("approved_by").references(() => users.userId),
  approvedAt: timestamp("approved_at"),
  rejectionReason: text("rejection_reason"),
  attachments: jsonb("attachments"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Disciplinary Records
export const disciplinaryRecords = pgTable("disciplinary_records", {
  id: uuid("id").primaryKey().defaultRandom(),
  studentId: uuid("student_id").references(() => students.id),
  incidentDate: date("incident_date").notNull(),
  incidentType: varchar("incident_type", { length: 100 }).notNull(),
  description: text("description").notNull(),
  actionTaken: text("action_taken"),
  reportedBy: uuid("reported_by").references(() => staff.id),
  severity: varchar("severity", { length: 20 }).default("minor"), // minor, major, severe
  status: varchar("status", { length: 20 }).default("open"), // open, closed, resolved
  parentNotified: boolean("parent_notified").default(false),
  followUpRequired: boolean("follow_up_required").default(false),
  followUpDate: date("follow_up_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Transport Management
export const transportRoutes = pgTable("transport_routes", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  routeName: varchar("route_name", { length: 255 }).notNull(),
  routeCode: varchar("route_code", { length: 50 }),
  startPoint: varchar("start_point", { length: 255 }),
  endPoint: varchar("end_point", { length: 255 }),
  distance: decimal("distance", { precision: 8, scale: 2 }),
  estimatedTime: integer("estimated_time"), // in minutes
  stops: jsonb("stops"), // Array of stop locations
  monthlyFee: decimal("monthly_fee", { precision: 10, scale: 2 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const transportVehicles = pgTable("transport_vehicles", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  vehicleNumber: varchar("vehicle_number", { length: 50 }).notNull(),
  vehicleType: varchar("vehicle_type", { length: 50 }).notNull(), // bus, van, car
  capacity: integer("capacity").notNull(),
  driverId: uuid("driver_id").references(() => staff.id),
  conductorId: uuid("conductor_id").references(() => staff.id),
  routeId: uuid("route_id").references(() => transportRoutes.id),
  insuranceExpiry: date("insurance_expiry"),
  permitExpiry: date("permit_expiry"),
  fitnessExpiry: date("fitness_expiry"),
  lastServiceDate: date("last_service_date"),
  nextServiceDate: date("next_service_date"),
  fuelType: varchar("fuel_type", { length: 20 }),
  averageMileage: decimal("average_mileage", { precision: 5, scale: 2 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Transport Allocations
export const transportAllocations = pgTable("transport_allocations", {
  id: uuid("id").primaryKey().defaultRandom(),
  studentId: uuid("student_id").references(() => students.id),
  routeId: uuid("route_id").references(() => transportRoutes.id),
  vehicleId: uuid("vehicle_id").references(() => transportVehicles.id),
  academicYearId: uuid("academic_year_id").references(() => academicYears.id),
  pickupPoint: varchar("pickup_point", { length: 255 }),
  dropPoint: varchar("drop_point", { length: 255 }),
  monthlyFee: decimal("monthly_fee", { precision: 10, scale: 2 }),
  allocationDate: date("allocation_date").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Library Management
export const libraryBooks = pgTable("library_books", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  isbn: varchar("isbn", { length: 20 }),
  title: varchar("title", { length: 500 }).notNull(),
  author: varchar("author", { length: 255 }),
  publisher: varchar("publisher", { length: 255 }),
  publishYear: integer("publish_year"),
  category: varchar("category", { length: 100 }),
  subCategory: varchar("sub_category", { length: 100 }),
  language: varchar("language", { length: 50 }),
  pages: integer("pages"),
  edition: varchar("edition", { length: 50 }),
  price: decimal("price", { precision: 10, scale: 2 }),
  location: varchar("location", { length: 100 }), // shelf location
  totalCopies: integer("total_copies").default(1),
  availableCopies: integer("available_copies").default(1),
  description: text("description"),
  coverImage: varchar("cover_image", { length: 500 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const libraryIssues = pgTable("library_issues", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookId: uuid("book_id").references(() => libraryBooks.id),
  studentId: uuid("student_id").references(() => students.id),
  staffId: uuid("staff_id").references(() => staff.id), // for staff book issues
  issueDate: date("issue_date").notNull(),
  dueDate: date("due_date").notNull(),
  returnDate: date("return_date"),
  fineAmount: decimal("fine_amount", { precision: 10, scale: 2 }).default(0),
  finePaid: boolean("fine_paid").default(false),
  bookCondition: varchar("book_condition", { length: 50 }).default("good"),
  remarks: text("remarks"),
  issuedBy: uuid("issued_by").references(() => users.userId),
  returnedBy: uuid("returned_by").references(() => users.userId),
  status: varchar("status", { length: 20 }).default("issued"), // issued, returned, overdue, lost
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Cafeteria Management
export const cafeteriaMenus = pgTable("cafeteria_menus", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  itemName: varchar("item_name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }), // breakfast, lunch, snacks, dinner
  description: text("description"),
  price: decimal("price", { precision: 8, scale: 2 }).notNull(),
  ingredients: jsonb("ingredients"),
  allergens: jsonb("allergens"),
  nutritionalInfo: jsonb("nutritional_info"),
  isVegetarian: boolean("is_vegetarian").default(false),
  isVegan: boolean("is_vegan").default(false),
  isAvailable: boolean("is_available").default(true),
  availableDays: jsonb("available_days"), // Array of days
  image: varchar("image", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const cafeteriaOrders = pgTable("cafeteria_orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  studentId: uuid("student_id").references(() => students.id),
  staffId: uuid("staff_id").references(() => staff.id),
  orderDate: date("order_date").notNull(),
  orderTime: timestamp("order_time").defaultNow(),
  items: jsonb("items"), // Array of {menuId, quantity, price}
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: paymentMethod("payment_method"),
  paymentStatus: paymentStatus("payment_status").default("pending"),
  orderStatus: varchar("order_status", { length: 20 }).default("pending"), // pending, preparing, ready, served, cancelled
  specialInstructions: text("special_instructions"),
  servedBy: uuid("served_by").references(() => users.userId),
  servedAt: timestamp("served_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Medical Records
export const medicalRecords = pgTable("medical_records", {
  id: uuid("id").primaryKey().defaultRandom(),
  studentId: uuid("student_id").references(() => students.id),
  staffId: uuid("staff_id").references(() => staff.id),
  recordDate: date("record_date").notNull(),
  recordType: varchar("record_type", { length: 50 }).notNull(), // checkup, incident, vaccination, prescription
  symptoms: text("symptoms"),
  diagnosis: text("diagnosis"),
  treatment: text("treatment"),
  prescription: text("prescription"),
  allergies: jsonb("allergies"),
  medications: jsonb("medications"),
  vitals: jsonb("vitals"), // blood pressure, temperature, etc.
  followUpRequired: boolean("follow_up_required").default(false),
  followUpDate: date("follow_up_date"),
  doctorName: varchar("doctor_name", { length: 255 }),
  nurseId: uuid("nurse_id").references(() => staff.id),
  parentNotified: boolean("parent_notified").default(false),
  attachments: jsonb("attachments"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Sports and Extracurricular Activities
export const activities = pgTable("activities", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // sports, music, art, drama, debate, etc.
  description: text("description"),
  coachId: uuid("coach_id").references(() => staff.id),
  maxParticipants: integer("max_participants"),
  currentParticipants: integer("current_participants").default(0),
  schedule: jsonb("schedule"), // days and times
  venue: varchar("venue", { length: 255 }),
  fee: decimal("fee", { precision: 10, scale: 2 }),
  requirements: text("requirements"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const activityParticipants = pgTable("activity_participants", {
  id: uuid("id").primaryKey().defaultRandom(),
  activityId: uuid("activity_id").references(() => activities.id),
  studentId: uuid("student_id").references(() => students.id),
  academicYearId: uuid("academic_year_id").references(() => academicYears.id),
  joinDate: date("join_date").notNull(),
  leaveDate: date("leave_date"),
  performance: text("performance"),
  achievements: jsonb("achievements"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Competitions and Awards
export const competitions = pgTable("competitions", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 100 }).notNull(), // academic, sports, cultural
  level: varchar("level", { length: 50 }).notNull(), // school, district, state, national, international
  description: text("description"),
  organizer: varchar("organizer", { length: 255 }),
  venue: varchar("venue", { length: 255 }),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  registrationDeadline: date("registration_deadline"),
  fee: decimal("fee", { precision: 10, scale: 2 }),
  maxParticipants: integer("max_participants"),
  eligibilityCriteria: text("eligibility_criteria"),
  prizes: jsonb("prizes"),
  rules: text("rules"),
  coordinatorId: uuid("coordinator_id").references(() => staff.id),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const competitionParticipants = pgTable("competition_participants", {
  id: uuid("id").primaryKey().defaultRandom(),
  competitionId: uuid("competition_id").references(() => competitions.id),
  studentId: uuid("student_id").references(() => students.id),
  registrationDate: date("registration_date").notNull(),
  participationStatus: varchar("participation_status", { length: 20 }).default(
    "registered",
  ), // registered, participated, absent
  result: varchar("result", { length: 100 }),
  position: integer("position"),
  score: decimal("score", { precision: 10, scale: 2 }),
  certificate: varchar("certificate", { length: 500 }),
  remarks: text("remarks"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Certificates and Achievements
export const certificates = pgTable("certificates", {
  id: uuid("id").primaryKey().defaultRandom(),
  studentId: uuid("student_id").references(() => students.id),
  type: varchar("type", { length: 100 }).notNull(), // academic, sports, behavior, attendance
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  issueDate: date("issue_date").notNull(),
  validUntil: date("valid_until"),
  certificateNumber: varchar("certificate_number", { length: 100 }),
  templateId: varchar("template_id", { length: 100 }),
  digitalCertificate: varchar("digital_certificate", { length: 500 }),
  issuedBy: uuid("issued_by").references(() => users.userId),
  verificationCode: varchar("verification_code", { length: 100 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Maintenance and Facilities
export const maintenanceRequests = pgTable("maintenance_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  location: varchar("location", { length: 255 }),
  priority: varchar("priority", { length: 20 }).default("medium"), // low, medium, high, urgent
  category: varchar("category", { length: 100 }), // electrical, plumbing, carpentry, painting, etc.
  reportedBy: uuid("reported_by").references(() => users.userId),
  assignedTo: uuid("assigned_to").references(() => staff.id),
  status: varchar("status", { length: 20 }).default("pending"), // pending, in_progress, completed, cancelled
  estimatedCost: decimal("estimated_cost", { precision: 10, scale: 2 }),
  actualCost: decimal("actual_cost", { precision: 10, scale: 2 }),
  startDate: date("start_date"),
  completionDate: date("completion_date"),
  attachments: jsonb("attachments"),
  remarks: text("remarks"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Vendor Management
export const vendors = pgTable("vendors", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  name: varchar("name", { length: 255 }).notNull(),
  contactPerson: varchar("contact_person", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 255 }),
  address: text("address"),
  category: varchar("category", { length: 100 }), // supplies, maintenance, food, transport, etc.
  taxNumber: varchar("tax_number", { length: 100 }),
  bankDetails: jsonb("bank_details"),
  contractDetails: jsonb("contract_details"),
  rating: decimal("rating", { precision: 3, scale: 2 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Purchase Orders
export const purchaseOrders = pgTable("purchase_orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  vendorId: uuid("vendor_id").references(() => vendors.id),
  orderNumber: varchar("order_number", { length: 100 }).notNull(),
  orderDate: date("order_date").notNull(),
  expectedDelivery: date("expected_delivery"),
  actualDelivery: date("actual_delivery"),
  items: jsonb("items"), // Array of items with quantities and prices
  totalAmount: decimal("total_amount", { precision: 12, scale: 2 }).notNull(),
  taxAmount: decimal("tax_amount", { precision: 12, scale: 2 }),
  discountAmount: decimal("discount_amount", { precision: 12, scale: 2 }),
  finalAmount: decimal("final_amount", { precision: 12, scale: 2 }).notNull(),
  status: varchar("status", { length: 20 }).default("pending"), // pending, approved, ordered, received, cancelled
  approvedBy: uuid("approved_by").references(() => users.userId),
  receivedBy: uuid("received_by").references(() => users.userId),
  remarks: text("remarks"),
  attachments: jsonb("attachments"),
  createdBy: uuid("created_by").references(() => users.userId),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Payroll Management
export const payrollStructure = pgTable("payroll_structure", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  staffId: uuid("staff_id").references(() => staff.id),
  basicSalary: decimal("basic_salary", { precision: 12, scale: 2 }).notNull(),
  allowances: jsonb("allowances"), // HRA, DA, TA, etc.
  deductions: jsonb("deductions"), // PF, ESI, Tax, etc.
  grossSalary: decimal("gross_salary", { precision: 12, scale: 2 }).notNull(),
  netSalary: decimal("net_salary", { precision: 12, scale: 2 }).notNull(),
  effectiveFrom: date("effective_from").notNull(),
  effectiveTo: date("effective_to"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const payrollRecords = pgTable("payroll_records", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  staffId: uuid("staff_id").references(() => staff.id),
  payrollStructureId: uuid("payroll_structure_id").references(
    () => payrollStructure.id,
  ),
  payrollMonth: varchar("payroll_month", { length: 7 }).notNull(), // YYYY-MM format
  workingDays: integer("working_days").notNull(),
  presentDays: integer("present_days").notNull(),
  leaveDays: integer("leave_days").default(0),
  overtime: decimal("overtime", { precision: 8, scale: 2 }).default(0),
  overtimeRate: decimal("overtime_rate", { precision: 8, scale: 2 }),
  bonuses: decimal("bonuses", { precision: 10, scale: 2 }).default(0),
  penalties: decimal("penalties", { precision: 10, scale: 2 }).default(0),
  grossSalary: decimal("gross_salary", { precision: 12, scale: 2 }).notNull(),
  totalDeductions: decimal("total_deductions", {
    precision: 12,
    scale: 2,
  }).notNull(),
  netSalary: decimal("net_salary", { precision: 12, scale: 2 }).notNull(),
  paymentDate: date("payment_date"),
  paymentMethod: paymentMethod("payment_method"),
  paymentReference: varchar("payment_reference", { length: 255 }),
  status: varchar("status", { length: 20 }).default("pending"), // pending, processed, paid
  generatedBy: uuid("generated_by").references(() => users.userId),
  approvedBy: uuid("approved_by").references(() => users.userId),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Expense Management
export const expenseCategories = pgTable("expense_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  budgetLimit: decimal("budget_limit", { precision: 12, scale: 2 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const expenses = pgTable("expenses", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  categoryId: uuid("category_id").references(() => expenseCategories.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  expenseDate: date("expense_date").notNull(),
  paymentMethod: paymentMethod("payment_method").notNull(),
  vendorId: uuid("vendor_id").references(() => vendors.id),
  receipts: jsonb("receipts"), // Array of receipt URLs
  status: varchar("status", { length: 20 }).default("pending"), // pending, approved, rejected, paid
  submittedBy: uuid("submitted_by").references(() => users.userId),
  approvedBy: uuid("approved_by").references(() => users.userId),
  approvalDate: date("approval_date"),
  rejectionReason: text("rejection_reason"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// System Settings and Configurations
export const systemSettings = pgTable("system_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  settingKey: varchar("setting_key", { length: 255 }).notNull(),
  settingValue: text("setting_value"),
  dataType: varchar("data_type", { length: 50 }).default("string"), // string, number, boolean, json
  category: varchar("category", { length: 100 }), // general, academic, financial, etc.
  description: text("description"),
  isEditable: boolean("is_editable").default(true),
  updatedBy: uuid("updated_by").references(() => users.userId),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Audit Logs
export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  userId: uuid("user_id").references(() => users.userId),
  action: varchar("action", { length: 255 }).notNull(),
  tableName: varchar("table_name", { length: 100 }),
  recordId: uuid("record_id"),
  oldValues: jsonb("old_values"),
  newValues: jsonb("new_values"),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  timestamp: timestamp("timestamp").defaultNow(),
});

// Notifications
export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  userId: uuid("user_id").references(() => users.userId),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  type: varchar("type", { length: 50 }).notNull(), // info, warning, error, success
  isRead: boolean("is_read").default(false),
  actionUrl: varchar("action_url", { length: 500 }),
  expiryDate: timestamp("expiry_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

// File Storage
export const fileStorage = pgTable("file_storage", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id").references(() => schools.id),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  originalName: varchar("original_name", { length: 255 }).notNull(),
  filePath: varchar("file_path", { length: 500 }).notNull(),
  fileSize: integer("file_size").notNull(),
  mimeType: varchar("mime_type", { length: 100 }).notNull(),
  uploadedBy: uuid("uploaded_by").references(() => users.userId),
  isPublic: boolean("is_public").default(false),
  tags: jsonb("tags"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  staff: one(staff, { fields: [users.userId], references: [staff.userId] }),
  student: one(students, { fields: [users.userId], references: [students.userId] }),
  parent: one(parents, { fields: [users.userId], references: [parents.userId] }),
  createdAnnouncements: many(announcements),
  sentCommunications: many(communications),
  auditLogs: many(auditLogs),
  notifications: many(notifications),
  uploadedFiles: many(fileStorage),
}));

export const schoolsRelations = relations(schools, ({ many }) => ({
  academicYears: many(academicYears),
  classes: many(classes),
  subjects: many(subjects),
  staff: many(staff),
  students: many(students),
  events: many(events),
  announcements: many(announcements),
  communications: many(communications),
  hostels: many(hostels),
  feeStructure: many(feeStructure),
  transportRoutes: many(transportRoutes),
  transportVehicles: many(transportVehicles),
  libraryBooks: many(libraryBooks),
  cafeteriaMenus: many(cafeteriaMenus),
  activities: many(activities),
  competitions: many(competitions),
  maintenanceRequests: many(maintenanceRequests),
  vendors: many(vendors),
  purchaseOrders: many(purchaseOrders),
  payrollStructure: many(payrollStructure),
  payrollRecords: many(payrollRecords),
  expenseCategories: many(expenseCategories),
  expenses: many(expenses),
  systemSettings: many(systemSettings),
  auditLogs: many(auditLogs),
  notifications: many(notifications),
  fileStorage: many(fileStorage),
}));

export const studentsRelations = relations(students, ({ one, many }) => ({
  user: one(users, { fields: [students.userId], references: [users.userId] }),
  school: one(schools, {
    fields: [students.schoolId],
    references: [schools.id],
  }),
  class: one(classes, { fields: [students.classId], references: [classes.id] }),
  parents: many(studentParents),
  siblings: many(siblings),
  attendance: many(attendance),
  grades: many(grades),
  feePayments: many(feePayments),
  hostelAllocations: many(hostelAllocations),
  transportAllocations: many(transportAllocations),
  libraryIssues: many(libraryIssues),
  cafeteriaOrders: many(cafeteriaOrders),
  medicalRecords: many(medicalRecords),
  activityParticipants: many(activityParticipants),
  competitionParticipants: many(competitionParticipants),
  certificates: many(certificates),
  disciplinaryRecords: many(disciplinaryRecords),
  leaves: many(leaves),
}));

export const staffRelations = relations(staff, ({ one, many }) => ({
  user: one(users, { fields: [staff.userId], references: [users.userId] }),
  school: one(schools, { fields: [staff.schoolId], references: [schools.id] }),
  classSubjects: many(classSubjects),
  timetable: many(timetable),
  attendance: many(attendance),
  grades: many(grades),
  hostels: many(hostels),
  libraryIssues: many(libraryIssues),
  cafeteriaOrders: many(cafeteriaOrders),
  medicalRecords: many(medicalRecords),
  activities: many(activities),
  competitions: many(competitions),
  payrollStructure: many(payrollStructure),
  payrollRecords: many(payrollRecords),
  leaves: many(leaves),
  disciplinaryRecords: many(disciplinaryRecords),
}));

export const parentsRelations = relations(parents, ({ one, many }) => ({
  user: one(users, { fields: [parents.userId], references: [users.userId] }),
  students: many(studentParents),
}));

export const classesRelations = relations(classes, ({ one, many }) => ({
  school: one(schools, {
    fields: [classes.schoolId],
    references: [schools.id],
  }),
  students: many(students),
  classSubjects: many(classSubjects),
  timetable: many(timetable),
  attendance: many(attendance),
  examSubjects: many(examSubjects),
  feeStructure: many(feeStructure),
}));

export const subjectsRelations = relations(subjects, ({ one, many }) => ({
  school: one(schools, {
    fields: [subjects.schoolId],
    references: [schools.id],
  }),
  classSubjects: many(classSubjects),
  timetable: many(timetable),
  attendance: many(attendance),
  examSubjects: many(examSubjects),
  grades: many(grades),
}));

export const academicYearsRelations = relations(
  academicYears,
  ({ one, many }) => ({
    school: one(schools, {
      fields: [academicYears.schoolId],
      references: [schools.id],
    }),
    terms: many(terms),
    classSubjects: many(classSubjects),
    timetable: many(timetable),
    exams: many(exams),
    feeStructure: many(feeStructure),
    hostelAllocations: many(hostelAllocations),
    transportAllocations: many(transportAllocations),
    activityParticipants: many(activityParticipants),
  }),
);

export const termsRelations = relations(terms, ({ one, many }) => ({
  academicYear: one(academicYears, {
    fields: [terms.academicYearId],
    references: [academicYears.id],
  }),
  timetable: many(timetable),
  exams: many(exams),
}));
