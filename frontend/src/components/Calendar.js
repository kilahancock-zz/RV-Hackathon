import React, { Component } from 'react';
import './Calendar.css';



class Calendar extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
            times: [
              { Calendar: "8:00"},
              { Calendar: "9:00"},
              { Calendar: "10:00"},
              { Calendar: "11:00"},
              { Calendar: "12:00"},
              { Calendar: "1:00"},
              { Calendar: "2:00"},
              { Calendar: "3:00"},
              { Calendar: "4:00"},
              { Calendar: "5:00"},
              { Calendar: "6:00"},
           ]
        }
     }
  
     renderTableData() {
      return this.state.times.map((timeSlot, index) => {
         const { Calendar } = timeSlot //destructuring
         return (
            <tr key={Calendar}>
               <td class="timeDisplay">{Calendar}</td>
               <td class="subIntervalTimeDisplay">
                   <table class="innerTable">
                       <tbody>
                        <tr class="innerSub" id="subInterval-15"><td></td></tr>
                        <tr class="innerSub"  id="subInterval-30"><td></td></tr>
                        <tr class="innerSub"  id="subInterval-45"><td></td></tr>
                        <tr class="innerSub"  id="subInterval-60"><td></td></tr>
                        </tbody>
                    </table>
                </td>
            </tr>
         )
      })
   }
  
   render() {
      return (
         <div id="calendar">
            <table variant="calendar" class="table" id='timeSlots'>
                <thead>
                    <tr>
                        <th class="row-1 row-ID" colspan="2">Calendar</th>
                    </tr>
                </thead>
               <tbody>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
      )
   }
}


export default Calendar;
