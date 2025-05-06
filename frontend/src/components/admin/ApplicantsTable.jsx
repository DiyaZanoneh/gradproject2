import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
  } from '../ui/table';
  import {
    Popover,
    PopoverContent,
    PopoverTrigger
  } from '../ui/popover';
  import { MoreHorizontal } from 'lucide-react';
  import { useSelector } from 'react-redux';
  import { toast } from 'sonner';
  import { APPLICATION_API_END_POINT } from '@/utils/constant';
  import axios from 'axios';
  import { useEffect } from 'react';
  
  const shortlistingStatus = ['Accepted', 'Rejected'];
  
  const ApplicantsTable = () => {
    const { applicants } = useSelector((store) => store.application);
  
    useEffect(() => {
      console.log('Applicants:', applicants);
    }, [applicants]);
  
    const statusHandler = async (status, id) => {
      if (!id || id === 'undefined') {
        toast.error('Invalid applicant ID.');
        return;
      }
  
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(
          `${APPLICATION_API_END_POINT}/status/${id}/update`,
          { status }
        );
        if (res.data.success) {
          toast.success(res.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error(
          error?.response?.data?.message || 'Failed to update status.'
        );
      }
    };
  
    return (
      <div>
        <Table>
          <TableCaption>A list of your recent applied users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>FullName</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants?.applications?.length > 0 ? (
              applicants.applications.map((item) => {
                const applicant = item?.applicant;
                const profile = applicant?.profile;
  
                return (
                  <TableRow key={item?._id || Math.random()}>
                    <TableCell>{applicant?.fullname || 'N/A'}</TableCell>
                    <TableCell>{applicant?.email || 'N/A'}</TableCell>
                    <TableCell>{applicant?.phoneNumber || 'N/A'}</TableCell>
                    <TableCell>
                      {profile?.resume ? (
                        <a
                          className="text-blue-600 cursor-pointer"
                          href={profile.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {profile.resumeOriginalName || 'Resume'}
                        </a>
                      ) : (
                        <span>NA</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {applicant?.createdAt
                        ? applicant.createdAt.split('T')[0]
                        : 'N/A'}
                    </TableCell>
                    <TableCell className="float-right cursor-pointer">
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal />
                        </PopoverTrigger>
                        <PopoverContent className="w-32">
                          {shortlistingStatus.map((status, index) => (
                            <div
                              onClick={() =>
                                statusHandler(status, item?._id)
                              }
                              key={index}
                              className="flex w-fit items-center my-2 cursor-pointer"
                            >
                              <span>{status}</span>
                            </div>
                          ))}
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No applicants found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  export default ApplicantsTable;
  