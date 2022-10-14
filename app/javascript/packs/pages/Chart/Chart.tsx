import React, {useEffect} from "react";
import useAPI from "../../utils/callAPI";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const Chart = () => {
  const { callAPI, loading, response } = useAPI({
    method: 'get',
    path: '/api/v1/reports',
  })

  useEffect(() => {
    callAPI()
  }, [])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  let months = []
  let monthAmount = []
  if (response) {
    months = Object.keys(response.data)
    monthAmount = Object.values(response.data)
  }

  const data = {
    labels: months,
    datasets: [
      {
        fill: true,
        label: 'Dataset 2',
        data: monthAmount,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return (
    <>
      <main id="main">
        <section id="contact" className="contact" style={{paddingBottom: "0"}}>
          <div className="container" data-aos="fade-up">

            <div className="section-title">
              <h2>chart</h2>
            </div>
          </div>
        </section>
      </main>
      <div className="row justify-content-center">
        <div className="col-8">
          <div style={{width: '100%'}}>
            { loading ? '' : <Line options={options} data={data} /> }
          </div>
        </div>
      </div>
    </>
  )
}

export default Chart
