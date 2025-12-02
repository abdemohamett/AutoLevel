"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

type Point = {
  is: string
  design: string
}

export default function AutoLevelPage() {
  const [bm, setBm] = useState<string>("")
  const [bs, setBs] = useState<string>("")
  const [hoc, setHoc] = useState<number | null>(null)
  const [points, setPoints] = useState<Point[]>([])

  const calculateHOC = () => {
    const bmValue = parseFloat(bm)
    const bsValue = parseFloat(bs)
    if (!isNaN(bmValue) && !isNaN(bsValue)) {
      setHoc(bmValue + bsValue)
    }
  }

  const updatePoint = (index: number, field: keyof Point, value: string) => {
    setPoints((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const addPoint = () => {
    setPoints([...points, { is: "", design: "" }])
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
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold">AutoLevel</h1>

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
              />
            </div>
            <Button onClick={calculateHOC} className="w-full md:w-auto">
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
              <CardTitle>Points</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {points.map((point, index) => {
                const rl = calculateRL(point.is)
                const difference = calculateDifference(rl, point.design)

                return (
                  <div key={index} className="space-y-4 rounded-lg border p-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor={`point-is-${index}`}>IS Reading</Label>
                        <Input
                          id={`point-is-${index}`}
                          type="number"
                          step="0.001"
                          placeholder="Enter IS"
                          value={point.is}
                          onChange={(e) => updatePoint(index, "is", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`point-design-${index}`}>Design RL (Optional)</Label>
                        <Input
                          id={`point-design-${index}`}
                          type="number"
                          step="0.001"
                          placeholder="Enter Design RL"
                          value={point.design}
                          onChange={(e) => updatePoint(index, "design", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 rounded-md bg-muted p-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">RL</p>
                        <p className="text-xl font-semibold">{formatNumber(rl)}</p>
                      </div>
                      {point.design && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Difference</p>
                          <p className="text-xl font-semibold">{formatNumber(difference)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}

              <Button onClick={addPoint} variant="outline" className="w-full">
                + Add Point
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

