import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const VerifyEmailSchema = z.object({
    verificationCode: z.string().min(6, '6桁のコードを入力してください'),
});

type VerifyEmailProps = {
    handleToggleClickRegister: () => void;
    handleSubmitVerificationCode: (data: { verificationCode: string }) => void;
};

const VerifyEmailForm = ({ handleToggleClickRegister, handleSubmitVerificationCode }: VerifyEmailProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ verificationCode: string }>({
        resolver: zodResolver(VerifyEmailSchema),
        mode: 'onBlur',
    });
    return (
        <Card className="mx-auto min-w-96">
            <CardHeader>
                <CardTitle className="text-xl">Verify Check</CardTitle>
                <CardDescription>Enter your verify code to create an account</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-4 w-100">
                        <div className="grid gap-2">
                            <Label htmlFor="verify-code">verify code</Label>
                            <Input {...register('verificationCode')} id="verify-code" required />
                            {errors.verificationCode && (
                                <span className="text-red-500 text-xs">
                                    {errors.verificationCode.message?.toString()}
                                </span>
                            )}
                        </div>
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        onClick={handleSubmit((data) => handleSubmitVerificationCode(data))}
                        disabled={Object.keys(errors).length > 0}
                    >
                        Submit
                    </Button>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 text-center text-sm">
                    <Button type="submit" className="w-full" disabled>
                        Resent verify code
                    </Button>

                    <Button type="submit" className="w-full" onClick={handleToggleClickRegister}>
                        Go back
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default VerifyEmailForm;
