import React from "react";
import { isNil, noop } from "lodash";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { TBodyHeader, TColumns, TRow, TRowItem } from "../tableTypes";

const Personalized: React.FC<any> = ({
	component,
	functions,
	value,
	row,
	p,
}) => {
	const Component: React.FC<any> = component;
	return <Component functions={functions} value={value} row={row} {...p} />;
};

const TableData = ({
	columns,
	item,
	rowIndex,
	itemIndex,
	row,
	data,
	style,
	children,
	lineHeight,
}: any) => {
	const column = columns?.find((column: TColumns) => column.key === item?.key);
	return (
		<td
			className={twMerge(
				"text-center overflow-x-auto overflow-y-hidden scrollbar-custom",
				column?.date ? "w-48" : column?.width ? column?.width : "w-auto",
				(column?.editable && !column?.disabled) ||
					column?.select ||
					column?.personalized
					? ""
					: "cursor-not-allowed",
				rowIndex < data?.values?.length - 1 ? "border-b" : "",
				itemIndex < row?.data?.length - 1 ? "border-r" : "",
				row?.style?.background &&
					!column?.disabled &&
					(column?.editable || column?.select || column?.personalized)
					? row.style.background
					: style?.background &&
							!column?.disabled &&
							(column?.editable || column?.select || column?.personalized)
						? style.background
						: "",
				row?.style?.disabled
					? (row?.style?.disabled && column?.disabled) ||
						(!column?.editable && !column?.select && row?.style?.disabled) ||
						(column?.select && column?.disabled && row?.style?.disabled)
						? column?.personalized
							? ""
							: row.style.disabled
						: column?.personalized
							? ""
							: row?.style?.background
								? row.style.background
								: style?.background
									? style.background
									: "bg-slate-50"
					: (style?.disabled && column?.disabled) ||
							(!column?.editable && style?.disabled)
						? column?.personalized
							? ""
							: style.disabled
						: column?.personalized
							? ""
							: row?.style?.background
								? row.style.background
								: style?.background
									? style.background
									: "bg-slate-50",
				style?.border ? style.border : "",
				row?.style?.text
					? row.style.text
					: style?.text
						? style.text
						: "text-gray-600",
				row?.style?.textStyle
					? row.style.textStyle
					: style?.textStyle
						? style.textStyle
						: "not-italic	",
				style?.size ? style.size : "",
			)}
			style={{
				width: column?.resizedWidth,
			}}
		>
			<div
				className={twMerge(
					"whitespace-nowrap text-center",
					lineHeight ? lineHeight : "",
				)}
				style={{
					width: column?.resizedWidth,
				}}
			>
				{children}
			</div>
		</td>
	);
};

export default function Body({
	data = {},
	columns = [],
	edit = noop,
	transferableRow = false,
	transferencykey = "",
	handleSelectRow = noop,
	onRowDoubleClick = noop,
	selected = [],
}: TBodyHeader) {
	const { style, checkbox }: any = data;
	return (
		<tbody id="table-body">
			{data?.values?.map((row: TRow, rowIndex: number) => (
				<tr
					key={rowIndex}
					onDoubleClick={() =>
						onRowDoubleClick({ row: row, primaryKey: transferencykey })
					}
				>
					{transferableRow && (
						<TableData
							columns={columns}
							row={row}
							rowIndex={rowIndex}
							itemIndex={0}
							data={data}
							style={style}
						>
							<div className="flex items-center justify-center">
								<input
									type="checkbox"
									checked={selected.find((item: string | number | boolean) => {
										const index = row?.data?.findIndex(
											(val: TRowItem) => val.key === transferencykey,
										);
										//@ts-ignore
										return row?.data[index]?.value === item;
									})}
									onChange={() => handleSelectRow(rowIndex)}
									className={twMerge(
										"appearance-none focus:ring-0 focus:ring-offset-0 cursor-pointer",
										checkbox?.style?.width ? checkbox.style.width : "w-6",
										checkbox?.style?.height ? checkbox.style.height : "h-6",
										checkbox?.style?.rounded
											? checkbox.style.rounded
											: "rounded-md",
										checkbox?.style?.border ? checkbox.style.border : "",
										`checked:${
											checkbox?.style?.background
												? checkbox.style.background
												: ""
										}`,
										`focus:checked:${
											checkbox?.style?.background
												? checkbox.style.background
												: ""
										}`,
										`hover:checked:${
											checkbox?.style?.background
												? checkbox.style.background
												: ""
										}`,
									)}
								/>
							</div>
						</TableData>
					)}
					{columns.map((column: TColumns) => {
						const item = row.data?.find(
							(value) => value.key === column.key,
						) as TRowItem;
						const itemC = columns?.find(
							(column: TColumns) => column.key === item?.key,
						);
						const itemIndex = row.data?.indexOf(item);
						return (
							item && (
								<TableData
									columns={columns}
									item={item}
									rowIndex={rowIndex}
									itemIndex={itemIndex}
									row={row}
									data={data}
									lineHeight={data.linesHeight}
									style={style}
									key={itemIndex}
								>
									{itemC?.select ? (
										<div className="w-full">
											<select
												value={isNil(item.value) ? "" : item.value}
												onChange={({ target }) =>
													edit(
														rowIndex,
														itemIndex,
														itemC?.selectPrimaryKey
															? Number.parseInt(target.value)
															: target.value,
													)
												}
												disabled={itemC?.disabled}
												className={twMerge(
													"border-none ring-0 focus:border-transparent focus:ring-0 w-full text-center",
													itemC?.disabled && row?.style?.disabled
														? row.style.disabled
														: row?.style?.background
															? row.style.background
															: style?.background
																? style.background
																: "",
													style?.size ? style.size : "",
													row?.style?.textStyle
														? row.style.textStyle
														: style?.textStyle
															? style.textStyle
															: "not-italic	",
													isNil(item.value) ? "text-gray-300" : "",
													itemC?.disabled
														? "cursor-not-allowed"
														: "cursor-pointer",
												)}
											>
												<option
													disabled={!itemC?.canClearSelect}
													value=""
													className="text-gray-300"
												>
													{itemC?.selectText
														? itemC.selectText
														: "Selecione uma opção"}
												</option>
												{itemC?.options?.map(
													(option, index: number | string) => (
														<option
															value={
																//@ts-ignore
																option[
																	itemC?.selectKey ? itemC.selectKey : "id"
																]
															}
															key={index}
														>
															{
																//@ts-ignore
																option[
																	itemC?.selectView ? itemC.selectView : "name"
																]
															}
														</option>
													),
												)}
											</select>
										</div>
									) : itemC?.editable && !itemC?.disabled ? (
										itemC?.date ? (
											<DatePicker
												selected={item.value}
												onChange={(val) => edit(rowIndex, itemIndex, val)}
												disabled={itemC?.disabled}
												dateFormat="dd/MM/yyyy"
												className={twMerge(
													"border-none ring-0 w-full min-w-max focus:border-transparent focus:ring-0 text-center",
													row?.style?.background
														? row.style.background
														: style?.background
															? style.background
															: "",
													row?.style?.textStyle
														? row.style.textStyle
														: style?.textStyle
															? style.textStyle
															: "not-italic	",
													style?.size ? style.size : "",
												)}
											/>
										) : (
											<input
												type={itemC?.type ? itemC?.type : "text"}
												value={
													itemC?.money && item?.value && !isNil(item.value)
														? item?.value?.toLocaleString("pt-br", {
																minimumFractionDigits: 2,
															})
														: isNil(item.value)
															? ""
															: item.value
												}
												onChange={({ target }) =>
													edit(rowIndex, itemIndex, target.value, itemC?.money)
												}
												disabled={itemC?.disabled}
												className={twMerge(
													"border-none ring-0 focus:border-transparent focus:ring-0 text-center overflow-y-hidden w-full min-w-max",
													row?.style?.background
														? row.style.background
														: style?.background
															? style.background
															: "",
													itemC?.width ? itemC?.width : "w-full",
													row?.style?.textStyle
														? row.style.textStyle
														: style?.textStyle
															? style.textStyle
															: "not-italic	",
													style?.size ? style.size : "",
												)}
											/>
										)
									) : itemC?.personalized ? (
										<Personalized
											component={itemC?.component}
											functions={itemC?.functions}
											value={item.value}
											row={row}
											p={itemC.props}
										/>
									) : itemC?.date && !isNil(item?.value) ? (
										moment
											.utc(item.value)
											.format(itemC?.format ? itemC.format : "L")
									) : itemC?.money && item?.value ? (
										"R$" +
										item?.value?.toLocaleString("pt-br", {
											minimumFractionDigits: 2,
										})
									) : (
										<div>{item.value}</div>
									)}
								</TableData>
							)
						);
					})}
				</tr>
			))}
		</tbody>
	);
}
