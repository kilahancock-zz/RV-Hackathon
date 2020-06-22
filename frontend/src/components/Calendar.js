import React, { Component } from 'react';
import './Calendar.css';



class Calendar extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            times: [
              { start: "08:00", end: "08:45"},
              { start: "09:15", end: "09:30"},
              { start: "10:40", end: "11:00"},
              { start: "11:00", end: "11:43"},
              { start: "12:08", end: "12:24"},
              { start: "13:00", end: "15:00"},
              { start: "15:00", end: "15:30"},
              { start: "17:00", end: "18:00"},
           ]
        }
     }
  
     renderTableData() {        
        let lastEnd = 8;
        return this.state.times.map((timeSlot, index) => {
//            const { Calendar } = timeSlot 
//            let startTime = calendarData.value[0].start.dateTime.substring(11,16);
            let startTime = timeSlot.start;
            let startHour = parseInt(startTime.substring(0,2));
            let startMinute = parseInt(startTime.substring(3));

            let spannerSizeTop = (startHour + startMinute/60) - lastEnd > 0 ? 20*((startHour + startMinute/60) - lastEnd) : 0;

            let counter = 0;
            while (spannerSizeTop > 0) {
                counter++;
                spannerSizeTop -= 5;
            }
            spannerSizeTop = 5*counter;

//            let endTime = calendarData.value[0].end.dateTime.substring(11,16);
            let endTime = timeSlot.end;
            let endHour = parseInt(endTime.substring(0,2));
            let endMinute = parseInt(endTime.substring(3));

            lastEnd = endHour + endMinute/60;

            let startVal = startMinute + 60 * (startHour - 8);
            let endVal = endMinute + 60 * (endHour - 8);
            
            let bubbleHeight = 100*(endVal - startVal)/300;

            counter = 0;
            while (bubbleHeight > 4.99) {
                counter++;
                bubbleHeight -= 5;
            }
            bubbleHeight = 5*counter;

            return (
                <div>
                    <div class={"spacer halfHeight-" + spannerSizeTop}></div>
                    <div class={"calendarWorkBubble halfHeight-" + bubbleHeight}>{startTime + "-" + endTime}</div>
                </div>
            )
        })
   }
  
   render() {
      return (
         <div id="calendar">
             <div class="calendarTitle">Calendar</div>
             <div class="calendarBody">
                {this.renderTableData()}
            </div>
         </div>
      )
   }
}


export default Calendar;
