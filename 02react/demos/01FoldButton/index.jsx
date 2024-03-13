"use client"

/**
 * 按钮折角、
 */
import React, { useState } from "react";
import "./index.css";

// 常量
const PLACEMENT = {
	leftTop: {
		label: "左上角",
		value: "1"
	},
	rightTop: {
		label: "右上角",
		value: "2"
	},
	rightBottom: {
		label: "右下角",
		value: "3"
	},
	leftBottom: {
		label: "左下角",
		value: "4"
	}
}

const PLACEMENT_CLASS_NAME = {
	[PLACEMENT.leftTop.value]: "placement-left-top",
	[PLACEMENT.rightTop.value]: "placement-right-top",
	[PLACEMENT.leftBottom.value]: "placement-left-bottom",
	[PLACEMENT.rightBottom.value]: "placement-right-bottom",
}

const Fold = function () {
	const [placement, setPlacement] = useState(PLACEMENT.leftTop.value);
	const handleSelectPlacement = (e) => {
		setPlacement(e.target.value);
	}
	const foldAngleClass = `fold-angle ${PLACEMENT_CLASS_NAME[placement]}`;
	return (
		<div className="fold-wrapper">
			<div className="fold-placement-radio">
				<legend>
					折角位置：
				</legend>
				{
					Object.keys(PLACEMENT).map(item => (
						<div className="fold-placement-radio-item" key={item}>
							<input
								type="radio"
								id={item}
								name="placement"
								value={PLACEMENT[item].value}
								checked={PLACEMENT[item].value === placement}
								onChange={handleSelectPlacement}
							/>
							<label htmlFor={item}>{PLACEMENT[item].label}</label>
						</div>
					))
				}
			</div>
			<button className="fold-button">
				<span className={foldAngleClass}/>
				鼠标移过来，折叠我吧！
			</button>
		</div>
	)
}

export default Fold;
