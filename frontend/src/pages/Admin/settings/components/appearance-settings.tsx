import { useEffect, useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Label } from "../../../../components/ui/label"
import { Slider } from "../../../../components/ui/slider"

export function AppearanceSettings() {
    const [fontSize, setFontSize] = useState(16)

    useEffect(() => {
        document.documentElement.style.fontSize = `${fontSize}px`
    }, [fontSize])

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Text</CardTitle>
                    <CardDescription>Customize the font size and other text settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
                            <span className="text-sm text-muted-foreground">{fontSize}px</span>
                        </div>
                        <Slider
                            id="font-size"
                            min={12}
                            max={24}
                            step={1}
                            defaultValue={[fontSize]}
                            onValueChange={(value) => setFontSize(value[0])}
                            aria-label="Font size"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Small</span>
                            <span>Large</span>
                        </div>
                    </div>

                </CardContent>
            </Card>

        </div>
    )
}
