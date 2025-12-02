"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function Page() {
  const [bm, setBm] = useState<string>("")
  const [bs, setBs] = useState<string>("")
  const [hoc, setHoc] = useState<number | null>(null)
  const [is, setIs] = useState<string>("")
  const [design, setDesign] = useState<string>("")

  const calculateHOC = () => {
    const bmValue = parseFloat(bm)
    const bsValue = parseFloat(bs)
    if (!isNaN(bmValue) && !isNaN(bsValue)) {
      setHoc(bmValue + bsValue)
    }
  }

  const calculateRL = (isValue: string): number | null => {
    if (!hoc || !isValue) return null
    const is = parseFloat(isValue)
    if (isNaN(is)) return null
    return hoc - is
  }

  const calculateDifference = (rl: number | null, designValue: string): number | null => {
    if (rl === null || !designValue) return null
    const design = parseFloat(designValue)
    if (isNaN(design)) return null
    return design - rl
  }

  const formatNumber = (value: number | null): string => {
    if (value === null) return "-"
    return value.toFixed(3)
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-md md:max-w-4xl">
        <h1 className="mb-6 text-2xl md:text-3xl font-bold">AutoLevel</h1>

        {/* Benchmark Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Benchmark</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bm">Benchmark (BM)</Label>
              <Input
                id="bm"
                type="number"
                step="0.001"
                placeholder="Enter BM"
                value={bm}
                onChange={(e) => setBm(e.target.value)}
                className="h-12 text-base md:h-9 md:text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bs">Backsight (BS)</Label>
              <Input
                id="bs"
                type="number"
                step="0.001"
                placeholder="Enter BS"
                value={bs}
                onChange={(e) => setBs(e.target.value)}
                className="h-12 text-base md:h-9 md:text-sm"
              />
            </div>
            <Button onClick={calculateHOC} className="w-full h-12 text-base md:h-9 md:w-auto md:text-sm">
              Calculate HOC
            </Button>
            {hoc !== null && (
              <div className="rounded-md bg-muted p-4">
                <p className="text-sm font-medium text-muted-foreground">Height of Collimation (HOC)</p>
                <p className="text-2xl font-bold">{formatNumber(hoc)}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Points Section */}
        {hoc !== null && (
          <Card>
            <CardHeader>
              <CardTitle>Point</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="point-is">IS Reading</Label>
                  <Input
                    id="point-is"
                    type="number"
                    step="0.001"
                    placeholder="Enter IS"
                    value={is}
                    onChange={(e) => setIs(e.target.value)}
                    className="h-12 text-base md:h-9 md:text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="point-design">Design RL (Optional)</Label>
                  <Input
                    id="point-design"
                    type="number"
                    step="0.001"
                    placeholder="Enter Design RL"
                    value={design}
                    onChange={(e) => setDesign(e.target.value)}
                    className="h-12 text-base md:h-9 md:text-sm"
                  />
                </div>
              </div>
              <div className="grid gap-4 rounded-md bg-muted p-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">RL</p>
                  <p className="text-xl font-semibold">{formatNumber(calculateRL(is))}</p>
                </div>
                {design && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Difference</p>
                    <p className="text-xl font-semibold">{formatNumber(calculateDifference(calculateRL(is), design))}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
