import ChangePassword from '@/components/ChangePassword';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
import { ShieldCheck } from 'lucide-react';

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">Change Your Password</CardTitle>
            <CardDescription className="mt-2">
              For security reasons, please create a new password for your
              account.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {/* Form */}
          <ChangePassword />
          {/* Security Note */}
          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Security Tips:</strong>
            </p>
            <ul className="text-xs text-amber-700 dark:text-amber-300 mt-2 space-y-1 list-disc list-inside">
              <li>Never share your password with anyone</li>
              <li>Don&apos;t use the same password on multiple sites</li>
              <li>welcome to Palm mind Technology</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
