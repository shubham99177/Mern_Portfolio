import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  clearallforgetpassworderror,
  resetpassword,
} from "@/Redux/Slices/Forgetresetpasswordslice";
import { getuser } from "@/Redux/Slices/UserSlice";

function ResetPassword() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector(
    (state) => state.forgetpassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const [password, setPassword] = useState("");
  const [confiredpassword, setConfiredpassword] = useState("");

  function handleresetpassword() {
    dispatch(resetpassword(token, password, confiredpassword));
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearallforgetpassworderror());
    }
    if (message) {
      toast.success(message);
      dispatch(getuser());
    }
    if (isAuthenticated) {
      toast.success(message);
      navigate("/");
    }
  }, [dispatch, error, message, isAuthenticated, navigate]);

  return (
    <div>
      <div>
        <h1>Forget Password</h1>
        <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
          <div className=" min-h-[100vh] flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">reset password</h1>
                <p className="text-balance text-muted-foreground">
                  Set the new Password
                </p>
              </div>
              <div className="grid gap-4">
                <form action="">
                  <div className="grid gap-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="**********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="Confirm Password">Confirm Password</Label>
                    <Input
                      id="Confirm Password"
                      type="password"
                      placeholder="**********"
                      value={confiredpassword}
                      onChange={(e) => setConfiredpassword(e.target.value)}
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

                <Button
                  className="w-full"
                  onClick={() => handleresetpassword()}
                >
                  {loading ? "Submitting...." : "Login"}
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center bg-muted">
            <img src="/login.png" alt="login" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
