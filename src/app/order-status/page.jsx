import { Truck } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Component() {

    const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    function generateTrackingId() {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
    
        let trackingId = '';
        for (let i = 0; i < 3; i++) {
            trackingId += letters.charAt(Math.floor(Math.random() * letters.length));
        }
    

        for (let i = 0; i < 9; i++) {
            trackingId += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
    
        return trackingId;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
            <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-blue-600">Your Order is On the Way!</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
            <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-1 bg-gray-200 rounded"></div>
                </div>
                <Truck className="w-16 h-16 text-blue-500 relative z-10 animate-truck" />
            </div>
            <p className="text-center text-gray-600">
                Great news! Your package has left our warehouse and is making its way to you.
            </p>
            <div className="text-sm text-gray-500">
                <p>Estimated delivery: <span className="font-semibold">{currentDate}</span></p>
                <p>Tracking number: <span className="font-semibold">{generateTrackingId()}</span></p>
            </div>
            </CardContent>
        </Card>
        </div>
    )
}