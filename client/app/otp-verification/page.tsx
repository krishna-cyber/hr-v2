import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

const page = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className=" flex flex-col space-y-5 p-5 items-center justify-center border-4 h-[40%] w-[80%] sm:w-[75%] md:w-[50%]">
        <CardHeader className="w-full text-center">
          <CardTitle className="text-2xl">Verify OTP</CardTitle>
          <CardDescription className="flex flex-col justify-center items-center font-bold">
            <p>OTP is sent to your email. It will expire in 5 minutes</p>

            <p>Enter to verify</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot className="border-black/40" index={0} />
              <InputOTPSlot className="border-black/40" index={1} />
              <InputOTPSlot className="border-black/40" index={2} />
            </InputOTPGroup>

            <InputOTPGroup>
              <InputOTPSlot className="border-black/40" index={3} />
              <InputOTPSlot className="border-black/40" index={4} />
              <InputOTPSlot className="border-black/40" index={5} />
            </InputOTPGroup>
          </InputOTP>
        </CardContent>
        <CardFooter>
          <Button className="cursor-pointer">Verify</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
