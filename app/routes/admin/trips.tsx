import { Header } from 'components'
import React from 'react'

const Trips = () => {
  return (
    <main>
        <Header
        title="Trips"
        description="View and edit your travel plans"
        ctaText="Create a trip"
        ctaUrl="/trips/create"
      />
    </main>
  )
}

export default Trips