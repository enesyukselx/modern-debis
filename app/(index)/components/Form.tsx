"use client";
import { useForm, Resolver } from "react-hook-form";
import Button from "@/app/components/Button";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type FormValues = {
    email: string;
    password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
    if (!values.email || !values.password) {
        return {
            errors: {
                email: !values.email ? "Email is required" : undefined,
                password: !values.password ? "Password is required" : undefined,
            },
            values: values,
        };
    }
    return {
        errors: {},
        values,
    };
};

const Form = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({ resolver });
    const onSubmit = async (data: FormValues) => {
        toast.info("Giriş yapılıyor...");
        const response = await fetch(
            "/api/login?username=" + data.email + "&password=" + data.password,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response) {
            const data = await response.json();
            const sessionId = data.cookie.split("=")[1];
            const infoResponse = await fetch("/api/info?session=" + sessionId);
            const infoData = await infoResponse.json();
            if (infoData.student.name === "") {
                toast.error("Email veya şifre hatalı");
            } else {
                toast.success("Giriş işlemi başarılı.");
                document.cookie = "sessionId=" + sessionId;
                document.cookie = "student=" + JSON.stringify(infoData.student);
                router.push("/dashboard");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ToastContainer position="top-right" theme="dark" />
            <input
                type="text"
                placeholder="Email (@ogr.deu.edu.tr hariç)"
                {...register("email", { required: true })}
                className={
                    "mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                }
            />
            <span className="text-red-600 font-thin text-xs">
                {errors.email && "Lütfen e-mail adresinizi giriniz."}
            </span>
            <input
                type="password"
                placeholder="Şifre"
                {...register("password", { required: true })}
                className={
                    "mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                }
            />
            <span className="text-red-600 font-thin text-xs">
                {errors.password && "Lütfen şifrenizi giriniz."}
            </span>
            <Button type="submit" className="w-full mt-2" title="Giriş yap" />
        </form>
    );
};

export default Form;
