import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type VerifyEmailProps = {
    handleToggleClickRegister: () => void;
    handleUpdateUserInfo: ({ key, value }: { key: string; value: string }) => void;
    handleSubmitRegisterMail: () => void;
};

const VerifyEmailForm = ({ handleToggleClickRegister }: VerifyEmailProps) => {
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Verify Check</CardTitle>
                <CardDescription>Enter your verify code to create an account</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-4 w-100">
                        <div className="grid gap-2">
                            <Label htmlFor="verify-code">verify code</Label>
                            <Input id="verify-code" required />
                        </div>
                    </div>
                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 text-center text-sm">
                    <Button type="submit" className="w-full">
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
