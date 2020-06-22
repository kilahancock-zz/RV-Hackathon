import React, { Component } from 'react';
import './Calendar.css';



class Calendar extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            meetingArray: [
              { key: 1, start: "08:00", end: "08:45", title: "Morning meeting"},
              { key: 2, start: "09:15", end: "09:30", title: "Daily Check-in"},
              { key: 3, start: "10:30", end: "11:00", title: "Engineer Shadowing"},
              { key: 4, start: "11:00", end: "11:45", title: "Intense Programming Session"},
              { key: 5, start: "12:00", end: "12:30", title: "Lunch one-on-one"},
              { key: 6, start: "13:00", end: "15:00", title: "Peer Programming Meeting"},
              { key: 7, start: "15:00", end: "15:30", title: "WFH - Body Weight Workout"},
              { key: 8, start: "17:00", end: "18:00", title: "After-work Hangout"},
           ]
        }
     }

    async getOutlookData() {
        let endpoint = 'http://localhost:3000/getOutlookData';
        let returnValue = "";
        await fetch(endpoint).then(response => {
            returnValue = response.json();
        });
        return returnValue;
      }
  
     renderTableData() {        
        let lastEnd = 8;
        if (this.props.userEmail == "") {
            return(
                <div>
                    <div className={"calendarWorkBubble halfHeight-200"}> Log-In to sync Outlook Calendar to RedRelax</div>
                </div>
            )
        } else {
            return this.state.meetingArray.map((meetingInfo, index) => {
                let startTime = meetingInfo.start;
                let startHour = parseInt(startTime.substring(0,2));
                let startMinute = parseInt(startTime.substring(3));

                let spannerSizeTop = (startHour + startMinute/60) - lastEnd > 0 ? 20*((startHour + startMinute/60) - lastEnd) : 0;

                let counter = 0;
                while (spannerSizeTop > 0) {
                    counter++;
                    spannerSizeTop -= 5;
                }
                spannerSizeTop = 5*counter;

                let endTime = meetingInfo.end;
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
                        <div className={"spacer halfHeight-" + spannerSizeTop}></div>
                        <div className={"calendarWorkBubble halfHeight-" + bubbleHeight}>{startTime + "-" + endTime + " " + meetingInfo.title}</div>
                    </div>
                )
            })
        }
   }

   /**
    * Once the component mounts, the state is updated and the calendar will reload with proper meeting data
    */
    componentDidMount() {
        if (this.props.userEmail == "mbennett@redventures.com") {
            this.getOutlookData().then(calendarData => {
                //Grab the meetings for the day
                let meetings = calendarData.value;
    
                //Create an array of times that the 
                let meetingArray = [];
                try {
                    for (let i = 0; i < meetings.length; i++) {
                        
                        //Convert start time from UTC to current time (EST)
                        let startTime = meetings[i].start.dateTime.substring(11,16);
                        let startHour = parseInt(startTime.substring(0,2)) - 4;
                        if (startHour.length < 1) {
                            startHour = "0" + startHour;
                        }
                        startTime = startHour + startTime.substring(2);
        
                        //Convert end time from UTC to current time (EST)
                        let endTime = meetings[i].end.dateTime.substring(11,16);
                        let endHour = parseInt(endTime.substring(0,2)) - 4;
                        if (endHour.length < 1) {
                            endHour = "0" + endHour;
                        }
                        endTime = endHour + endTime.substring(2);
        
                        //Push the necessary data into the calendar array
                        meetingArray.push({key: i, start: startTime, end: endTime, title:meetings[i].subject});
                    }
    
                    //Set the state to the array of meetings
                    this.setState({meetingArray});
                }
                //If there is an error, it's almost for sure due to having an improper access token
                catch (error) {
                    console.error("Need new Outlook Calendar Access Token");
                }
            });
        }
    }
  
   render() {        
        return (
            <div id="calendar">
                <div className="calendarTitle">Calendar</div>
                <div className="calendarBody">
                    {this.renderTableData()}
                </div>
            </div>
        )
    }
}


export default Calendar;
