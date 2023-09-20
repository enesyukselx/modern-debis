"use client";
import { useState } from "react";
import {
    LiaAngleDoubleRightSolid,
    LiaAngleDoubleLeftSolid,
} from "react-icons/lia";

const Schedule = ({ schedule }) => {
    const days = [
        { name: "Pazartesi", value: 0, path: "monday", count: 0 },
        { name: "Salı", value: 1, path: "tuesday", count: 0 },
        { name: "Çarşamba", value: 2, path: "wednesday", count: 0 },
        { name: "Perşembe", value: 3, path: "thursday", count: 0 },
        { name: "Cuma", value: 4, path: "friday", count: 0 },
    ];

    const [selected, setSelected] = useState(0);

    return (
        <>
            <h3 className="text-orange-400 mt-1 text-4xl mb-2">
                {days[selected].name}
            </h3>

            <div className="mb-4 flex text-xl font-bold">
                <LiaAngleDoubleLeftSolid
                    className="bg-orange-500 rounded-full text-white mr-1 cursor-pointer hover:bg-orange-700"
                    onClick={() => {
                        if (selected > 0) {
                            setSelected(selected - 1);
                        }
                    }}
                />
                <LiaAngleDoubleRightSolid
                    className="bg-orange-500 rounded-full text-white cursor-pointer hover:bg-orange-700"
                    onClick={() => {
                        if (selected < 4) {
                            setSelected(selected + 1);
                        }
                    }}
                />
            </div>

            {schedule.map((item, index) => {
                const selectedDay = days[selected].path;
                const course = item[selectedDay].split("-")[1];

                if (item[selectedDay].trim() !== "") {
                    days[selected].count++;
                }
                return (
                    item[selectedDay].trim() !== "" && (
                        <div
                            key={index}
                            className="py-5 px-6 mb-2 rounded bg-slate-300 grid grid-cols-4 justify-between"
                        >
                            <div className="col-span-3 font-bold">
                                {course.split(".")[0].slice(0, -1)}
                            </div>
                            <div className="col-span-1 text-end font-base">
                                {item.time}
                            </div>
                        </div>
                    )
                );
            })}
            {days[selected].count === 0 && (
                <div className="py-5 px-6 mb-2 rounded bg-orange-200 font-bold">
                    {days[selected].name} günü için ders bulunamadı.
                </div>
            )}
        </>
    );
};

export default Schedule;
