import Header from "./components/Header";

export default function Loading() {
	return (
		<main>
			<Header />
			<div className="m-auto flex w-2/3 items-start justify-between py-4">
				<div className="w-1/5">
					<div className="border-b pb-4">
						<h1 className="mb-2">Region</h1>
					</div>
					<div className="mt-3 border-b pb-4">
						<h1 className="mb-2">Cuisine</h1>
					</div>
					<div className="mt-3 pb-4">
						<h1 className="mb-2">Price</h1>
						<div className="flex"></div>
					</div>
				</div>
				<div className="ml-4 w-5/6">
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
						<div
							key={num}
							className="mb-1 flex animate-pulse cursor-pointer overflow-hidden rounded border border-b bg-slate-200 p-5"
						>
							<div className="pl-5">
								<h2 className="text-3xl"></h2>
								<div className="flex items-start">
									<div className="mb-2 flex"></div>
									<p className="ml-2 text-sm"></p>
								</div>
								<div className="mb-9">
									<div className="text-reg flex font-light">
										<p className="mr-4 capitalize"></p>
										<p className="mr-4 capitalize"></p>
									</div>
								</div>
								<div className="text-red-600 hover:underline"></div>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
