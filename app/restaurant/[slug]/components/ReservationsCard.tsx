"use client";

import React, { useState } from "react";
import { partySize as partySizes, times } from "../../../../data";
import DatePicker from "react-datepicker";
import useAvailabilities from "@/hooks/useAvailabilities";
import { CircularProgress } from "@mui/material";
import Link from "next/link";

export default function ReservationsCard({
	open_time,
	close_time,
	slug,
}: {
	open_time: string;
	close_time: string;
	slug: string;
}) {
	const { data, loading, error, fetchAvailabilities } = useAvailabilities();
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
	const [time, setTime] = useState(open_time);
	const [partySize, setPartySize] = useState("2");
	const [day, setDay] = useState(new Date().toISOString().split("T")[0]);

	const handleChangeDate = (date: Date | null) => {
		if (date) {
			setDay(date.toISOString().split("T")[0]);
			return setSelectedDate(date);
		}
		return setSelectedDate(null);
	};

	const handleClick = async () => {
		fetchAvailabilities({ slug, day, time, partySize });
	};

	const filterTimeByRestaurantOpenWindow = () => {
		const timesWithinWindow: typeof times = [];
		let isWithinWindow = false;

		times.forEach((time) => {
			if (time.time === open_time) {
				isWithinWindow = true;
			}
			if (isWithinWindow) {
				timesWithinWindow.push(time);
			}
			if (time.time === close_time) {
				isWithinWindow = false;
			}
		});

		return timesWithinWindow;
	};

	return (
		<div className="fixed w-[15%] rounded bg-white p-3 shadow">
			<div className="border-b pb-2 text-center font-bold">
				<h4 className="mr-7 text-lg">Make a Reservation</h4>
			</div>
			<div className="my-3 flex flex-col">
				<label htmlFor="">Party size</label>
				<select
					name=""
					className="border-b py-3 font-light"
					id=""
					value={partySize}
					onChange={(e) => setPartySize(e.target.value)}
				>
					{partySizes.map((size) => (
						<option value={size.value}>{size.label}</option>
					))}
				</select>
			</div>
			<div className="flex justify-between">
				<div className="flex w-[48%] flex-col">
					<label htmlFor="">Date</label>
					<DatePicker
						className="text-reg w-24 border-b py-3 font-light"
						selected={selectedDate}
						onChange={handleChangeDate}
						dateFormat="MMMM d"
						wrapperClassName="w-[48%]"
					/>
				</div>
				<div className="flex w-[48%] flex-col">
					<label htmlFor="">Time</label>
					<select name="" id="" className="border-b py-3 font-light" value={time} onChange={(e) => setTime(e.target.value)}>
						{filterTimeByRestaurantOpenWindow().map((time) => (
							<option value={time.time}>{time.displayTime}</option>
						))}
					</select>
				</div>
			</div>
			<div className="mt-5">
				<button className="h-16 w-full rounded bg-red-600 px-4 font-bold text-white" onClick={handleClick} disabled={loading}>
					{loading ? <CircularProgress color="inherit" /> : "Find a Time"}
				</button>
			</div>
			{data && data.length ? (
				<div className="mt-4">
					<p className="text-reg">Select a Time</p>
					<div className="mt-2 flex flex-wrap">
						{data.map((time) => {
							return time.available ? (
								<Link
									href={`/reserve/${slug}?data=${day}T${time.time}&partySize=${partySize}`}
									className="mb-3 mr-3 w-24 cursor-pointer rounded bg-red-600 p-2 text-center text-white"
								>
									<p className="text-sm font-bold">{time.time}</p>
								</Link>
							) : (
								<p className="mb-3 mr-3 w-24 rounded bg-gray-300 p-2"></p>
							);
						})}
					</div>
				</div>
			) : null}
		</div>
	);
}
