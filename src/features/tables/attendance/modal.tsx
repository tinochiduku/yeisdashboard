import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import AttendanceForm from "./form";

export default function AttendanceModal ({ data }:any) {
    const _records = data.status
    const attendance = _records.length === 0 ?
    'absent'
    : 
    _records[0].status

    const initialData = {
        studentId:  data.id,
        classId:  data.classId,
        subjectId:  _records[0].subjectId || '',
        teacherId: _records[0].teacherId || '',
        status:  attendance,
        remarks:  _records[0].remarks || '',
        markedBy:  _records[0].markedBy || '' 
    }

    return (
        <Dialog>
            <DialogTrigger>
                <span
                 className={
                    `
                    font-medium
                    ${attendance === 'absent' ? 'bg-red-100 text-red-800' : ''}
                    ${attendance === 'present' ? 'bg-green-100 text-green-800' : ''}
                    ${attendance === 'late' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${attendance === 'excused' ? 'bg-blue-100 text-gray-800' : ''}


                    px-2 py-1 rounded-sm text-xs tracking-wider uppercase
                    `
                 }
                >
                    {attendance}
                </span>
            </DialogTrigger>
            <DialogContent>
                {/* <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader> */}
                <span>{_records[0]?.id}</span>
                <AttendanceForm pageTitle="Mark Attendance" id={_records[0]?.id} initialData={initialData} />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}