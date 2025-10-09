import GuestLayout2 from '@/components/layouts/GuestLayout2';
import TraceyFormData from './tracey-form-data';

export default function Tracey() {
  return (
    <GuestLayout2>
        <div className="w-full">
            <TraceyFormData />
        </div>
    </GuestLayout2>
  )
}