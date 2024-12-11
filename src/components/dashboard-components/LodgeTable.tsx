'use client'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { fetchLodges } from '../../../HandleRequest/GetData'
import { DataType } from '@/app/lodge/page'
import Link from 'next/link'
import Delete from '../client_crud_opration/Delete'



const Loader = () => (
  <div className="flex justify-center items-center h-64">
    <div className="loader border-t-4 border-primary rounded-full w-12 h-12 animate-spin"></div>
  </div>
);

function LodgeTable() {
  const [lodges, setLodges] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [reload, setReload] = useState<boolean>(false)

  const fetchData = async () => {
    try {
      setLoading(true); // Show loader
      const data: any = await fetchLodges();
      setLodges(data);
    } catch (error) {
      // console.error("Error fetching lodges:", error);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  useEffect(() => {
    fetchData();
  }, [reload]);

  const reloadPage =()=>{
    setTimeout(() => {
      // console.log('adsf')
      setReload(!reload)
    }, 1000);
  }

  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>Lodges</CardTitle>
        <CardDescription>All lodges of your store.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Loader /> // Show loader while loading data
        ) : lodges.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lodge</TableHead>
                <TableHead className="hidden sm:table-cell">Categories</TableHead>
                <TableHead className="hidden sm:table-cell">Size</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Opration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lodges.map((lodge, index) => (
                <TableRow
                  key={lodge.id}
                  className={`${index % 2 !== 0 && 'bg-accent'}`}
                >
                  <TableCell>
                    <div>
                      <Link href={`/view/${lodge.id}`} className="font-medium">
                        {lodge.LodgeName}
                      </Link>
                    </div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {lodge.id}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {lodge.Category}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="secondary">
                      {lodge.Size}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
                  <TableCell className="text-right">₹ {lodge.Rent}</TableCell>
                  <TableCell className="text-right">
                    <div onClick={reloadPage}><Delete id={lodge.id} /></div></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center text-gray-600">No lodges available at the moment.</p>
        )}
      </CardContent>
    </Card>
  );
}

export default LodgeTable;
