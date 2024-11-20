import { Button } from "@/components/ui/button";
import {
  clearallforgetpassworderror,
  forgetpassword,
} from "@/Redux/Slices/Forgetresetpasswordslice";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ForgetPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const { loading, error, message } = useSelector(
    (state) => state.forgetpassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearallforgetpassworderror());
    }
    if (message) {
      toast.success(message);
    }
    if (isAuthenticated) {
      toast.success(message);
    }
  }, [isAuthenticated, error, message, dispatch]);

  function handleforgetpassword() {
    dispatch(forgetpassword(email));
  }

  return (
    <div>
      <h1>Forget Password</h1>
      <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
        <div className=" min-h-[100vh] flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Forget password</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <form action="">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Link
                      to="/login"
                      className="ml-auto inline-block text-sm underline"
                    >
                      remember your password?
                    </Link>
                  </div>
                </div>
              </form>

              <Button className="w-full" onClick={() => handleforgetpassword()}>
                {loading ? "Submitting...." : "Change Password"}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center bg-muted">
          <img src="/login.png" alt="login" />
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
