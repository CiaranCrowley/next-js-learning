"use client";

import React, { useState } from "react";
import { partySize, times } from "../../../../data";
import DatePicker from "react-datepicker";

export default function ReservationsCard({
	open_time,
	close_time,
}: {
	open_time: string;
	close_time: string;
}) {
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

	const handleChangeDate = (date: Date | null) => {
		if (date) {
			return setSelectedDate(date);
		}
		return setSelectedDate(null);
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
				<select name="" className="border-b py-3 font-light" id="">
					{partySize.map((size) => (
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
					<select name="" id="" className="border-b py-3 font-light">
						{filterTimeByRestaurantOpenWindow().map((time) => (
							<option value={time.time}>{time.displayTime}</option>
						))}
					</select>
				</div>
			</div>
			<div className="mt-5">
				<button className="h-16 w-full rounded bg-red-600 px-4 font-bold text-white">
					Find a Time
				</button>
			</div>
		</div>
	);
}
