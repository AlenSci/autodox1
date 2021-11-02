import {gql} from "apollo-boost";
import React from "react";
import SubscriptionHook from "../hooks/subscription_hook";
import {Doughnut} from "react-chartjs-2";


const COMMENTS_SUBSCRIPTION = gql(`
subscription counter {
counter
}

`);

function LatestComment() {
    const [x, data] = SubscriptionHook(COMMENTS_SUBSCRIPTION, {id: 0});
    const doughnutData: any = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            radius: 160,
            cutout: 100 + data.counter * 40,
            data: [10, 10, data.counter + '0'],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 1
        }]
    }

    const plugins = [{
        beforeDraw: function (chart: any) {
            var width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
            ctx.restore();
            var fontSize = (height / 160).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "top";
            var text = data.counter,
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;
            ctx.fillText(text, textX, textY);
            ctx.save();
        }
    }]

    return (
        <div>
            {x(<Doughnut plugins={plugins} data={doughnutData}/>)}
        </div>
    );
}
export default LatestComment;