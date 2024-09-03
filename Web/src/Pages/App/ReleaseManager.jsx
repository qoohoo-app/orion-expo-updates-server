import { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import moment from 'moment'

import { useCQuery } from '../../Services'
import { Button, Card, Spinner } from '../../Components'
import { Release } from './Release'

export const ReleaseManager = ({ app }) => {
  const { data: uploads, isSuccess } = useCQuery(['uploads', app._id])
  const [update, setUpdate] = useState(null)
  const [releasing, setRelasing] = useState(false)

  if (!isSuccess) return <Spinner />

  return (
    <Card {...cardProps}>
      <DataTable
        style={{ marginTop: 20, width: '100%' }}
        value={uploads} paginator rows={10} emptyMessage='No app versions yet'
        selectionMode={releasing ? undefined : 'single'} selection={update} onSelectionChange={({ value }) => setUpdate(value)}
      >
        <Column field='updateId' header='Update ID' filter sortable />
        <Column field='createdAt' header='Created' sortable body={({ createdAt }) => moment(createdAt).format('YYYY-MM-DD HH:mm:ss')} />
        <Column field='releaseChannel' header='Channel' filter sortable />
        <Column field='version' header='Version' filter sortable />
        <Column field='status' header='Status' filter sortable />
      </DataTable>

      <Release update={update} releaseState={[releasing, setRelasing]} onHide={() => setUpdate(null)} />
    </Card>
  )
}

const cardProps = {
  title: 'RELEASE MANAGER',
  collapsable: true,
  collapsed: false,
  fadeIn: true,
  style: { padding: 20, width: '100%', maxWidth: 900, marginTop: 20 }
}
