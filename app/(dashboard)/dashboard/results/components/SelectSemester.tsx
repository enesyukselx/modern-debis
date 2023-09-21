"use client";
import { useRouter } from "next/navigation";

interface ISelectSemesterProps {
    semesters: {
        text: string;
        value: string;
    }[];
}

const SelectSemester = ({ semesters }: ISelectSemesterProps) => {
    const router = useRouter();
    return (
        <select
            name=""
            id=""
            className="block w-full mt-4 rounded-md bg-gray-200 border-transparent focus:border-gray-500 "
            defaultValue={0}
            onChange={(e) => {
                router.push("/dashboard/results/" + e.target.value);
            }}
        >
            <option value="0" disabled>
                Dönem Seçiniz.
            </option>
            {semesters.map((item, index) => {
                return (
                    <option key={index} value={item.value}>
                        {item.text}
                    </option>
                );
            })}
        </select>
    );
};

export default SelectSemester;
