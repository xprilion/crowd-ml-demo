import React from 'react'
import { HeatMapGrid } from 'react-grid-heatmap'

const xLabels = new Array(24).fill(0).map((_, i) => `${i}`)
const yLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const data = new Array(yLabels.length)
  .fill(0)
  .map(() =>
    new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 50 + 50))
  )

const Heatmap = () => {
  return (
    <HeatMapGrid
      data={data}
      xLabels={xLabels}
      yLabels={yLabels}
    />
  )
}

export default Heatmap