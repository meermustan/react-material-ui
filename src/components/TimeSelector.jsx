import React, { useState } from 'react';
import Moment from 'moment';
import ScrollSelect from './ScrollSelect';
import { HRS, MINUTES, AMPM, MONTH } from './constant';
import PropTypes from 'prop-types';

/**
 * TimePicker component for selecting time.
 * 
 * @param {object} props - The props object.
 * @param {string} props.selectedTime - The initially selected time in "hh:mm am/pm" format.
 * @param {boolean} props.showMonthSelector - Whether to show the month selector.
 * @param {function} props.onOk - Callback function invoked when "OK" button is clicked, returns a time.
 * @param {function} props.closePicker - Callback function invoked when the picker is closed.
 * @returns {JSX.Element} - TimePicker component.
 */
const TimePicker = ({ selectedTime, showMonthSelector, onOk, closePicker }) => {
    const [time, setTime] = useState(Moment().format("hh:mm a"));
    const [hr, setHr] = useState(selectedTime.split(':')[0]);
    const [min, setMin] = useState(selectedTime.split(':')[1].split(' ')[0]);
    const [amPm, setAmPm] = useState(selectedTime.split(':')[1].split(' ')[1] === 'am' ? 0 : 1);
    const [selectedMonth, setSelectedMonth] = useState(Moment().format("MMMM"));

    const onPressOkay = async () => {
        const amPmValues = {
            'am': 0,
            'pm': 1,
            '0': 0,
            '1': 1,
        }
        let newTime = `${amPmValues[amPm] === 0? hr : hr+12}:${min}`; 
        newTime = Moment(newTime, "HH:mm").format("HH:mm"); 

        
        if (showMonthSelector) {
            const selectedDateTime = Moment().month(selectedMonth).set({hour: amPmValues[amPm] === 0? hr : hr+12, minute: min, second: 0}).format("YYYY-MM-DD HH:mm:ss");
            onOk(selectedDateTime);
        } else {
            onOk(newTime);
        }
    
        closePicker();
    };
    

    const onCancel = () => {
        closePicker();
    };

    const handleMonthChange = (month) => {
        setSelectedMonth(month);
    };

    return (
        <>
            <div className="time-picker">
                <div className="time-edit-container">
                    <ScrollSelect
                        data={HRS}
                        height={40}
                        fontSize={13}
                        defaultSelection={parseInt(hr, 10) - 1}
                        parentHeight={250}
                        updateSelection={hr => setHr(parseInt(HRS[hr], 10))}
                        scrollerId="scroll-select-hr"
                    />
                    <ScrollSelect
                        data={MINUTES}
                        height={40}
                        fontSize={13}
                        defaultSelection={parseInt(min, 10)}
                        parentHeight={250}
                        updateSelection={min => setMin(parseInt(MINUTES[min], 10))}
                        scrollerId="scroll-select-min"
                    />
                    <ScrollSelect
                        data={AMPM}
                        height={40}
                        fontSize={13}
                        defaultSelection={parseInt(amPm, 10)}
                        parentHeight={250}
                        updateSelection={ampm => setAmPm(AMPM[ampm])}
                        scrollerId="scroll-select-ampm"
                    />
                    {showMonthSelector && (
                        <ScrollSelect
                            data={MONTH}
                            height={40}
                            fontSize={13}
                            defaultSelection={MONTH.indexOf(selectedMonth)}
                            parentHeight={250}
                            updateSelection={monthIndex => handleMonthChange(MONTH[monthIndex])}
                            scrollerId="scroll-select-month"
                        />
                    )}
                </div>
            </div>

            <div className="picker-footer">
                <button className="picker-cancel" onClick={onCancel}>CANCEL</button>
                <button className="picker-ok" onClick={onPressOkay}>OK</button>
            </div>
        </>
    );
};

TimePicker.propTypes = {
    selectedTime: PropTypes.string.isRequired,
    showMonthSelector: PropTypes.bool,
    onOk: PropTypes.func.isRequired,
    closePicker: PropTypes.func.isRequired,
};

TimePicker.defaultProps = {
    showMonthSelector: false,
};


export default TimePicker;
