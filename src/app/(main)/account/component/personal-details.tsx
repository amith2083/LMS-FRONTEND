'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Pencil, UserCircle2, Camera, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { useUpdateUser, useUpdateUserImage } from '@/features/users/hooks/useUserQueries';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  designation: z.string().optional(),
  bio: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function PersonalDetails({ userInfo }) {
 
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((prev) => !prev);

  const { formState } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userInfo?.name || '',
      designation: userInfo?.designation || '',
      bio: userInfo?.bio || '',
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userInfo?.name || '',
      designation: userInfo?.designation || '',
      bio: userInfo?.bio || '',
    },
  });

  const { mutateAsync: updateProfile, isPending: isSaving } = useUpdateUser();
  const { mutateAsync: updateImage, isPending: isUploading } = useUpdateUserImage();

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await updateImage({ id: userInfo?._id, file });
        toast.success('Profile picture updated');
      } catch (error) {
        toast.error('Failed to upload image');
      }
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      await updateProfile({ id: userInfo._id, data: values });
      toast.success('Profile updated successfully');
      toggleEdit();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
        
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center gap-4 group">
          <div className="relative cursor-pointer" onClick={handleImageClick}>
            <Avatar className="h-32 w-32 border-4 border-slate-50 ring-2 ring-indigo-50 shadow-inner group-hover:ring-indigo-200 transition-all duration-300">
              <AvatarImage src={userInfo?.profilePicture} className="object-cover" />
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-4xl font-bold">
                {userInfo?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-lg border border-slate-100 text-slate-600 group-hover:text-indigo-600 group-hover:scale-110 transition-all">
              {isUploading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Camera className="h-5 w-5" />
              )}
            </div>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange} 
          />
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            Profile Avatar
          </span>
        </div>

        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold font-display text-slate-900 tracking-tight flex items-center gap-2">
              <UserCircle2 className="w-5 h-5 text-indigo-500" />
              Personal Details
            </h3>
            <Button 
                variant="ghost" 
                size="sm" 
                className="text-slate-500 hover:text-indigo-600 font-semibold"
                onClick={toggleEdit}
            >
              {isEditing ? 'Cancel' : <><Pencil className="h-4 w-4 mr-2" /> Edit Info</>}
            </Button>
          </div>

          {!isEditing ? (
            <div className="grid sm:grid-cols-2 gap-y-6 gap-x-12">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Display Name</span>
                <p className="font-semibold text-slate-700">{userInfo?.name}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Current Role</span>
                <p className="font-semibold text-slate-700">{userInfo?.designation}</p>
              </div>
              <div className="sm:col-span-2 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Bio / Introduction</span>
                <p className="text-slate-600 text-sm leading-relaxed">{userInfo?.bio || 'You haven\'t shared your bio yet.'}</p>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <Label className="text-xs font-bold text-slate-500">Full Name</Label>
                      <FormControl>
                        <Input className="focus:border-indigo-500" placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="designation" render={({ field }) => (
                    <FormItem>
                      <Label className="text-xs font-bold text-slate-500">Designation</Label>
                      <FormControl>
                        <Input className="focus:border-indigo-500" placeholder="e.g. Full Stack Developer" {...field} />
                      </FormControl>
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="bio" render={({ field }) => (
                  <FormItem>
                    <Label className="text-xs font-bold text-slate-500">Bio</Label>
                    <FormControl>
                      <Textarea className="focus:border-indigo-500 h-28" placeholder="Tell us about yourself..." {...field} />
                    </FormControl>
                  </FormItem>
                )} />

                <Button disabled={isSaving} type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 shadow-lg shadow-indigo-100">
                  {isSaving ? 'Saving Changes...' : 'Save Profile'}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}
