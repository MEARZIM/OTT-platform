
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Link } from 'react-router-dom'
import { NAV_ITEMS } from './SuperAdmin'
import { useAdminRouteStore } from '../../../lib/store'

const Default = () => {
    const { activeSection } = useAdminRouteStore();
    return (
        <div className="flex items-center justify-center h-full">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Coming Soon</CardTitle>
                    <CardDescription>This section is under development and will be available soon.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>The {NAV_ITEMS.find(item => item.id === activeSection)?.label} module is currently being built. Please check back later.</p>
                </CardContent>
                <CardFooter>
                    <Button asChild>
                        <Link to="/super-admin/dashboard">Return to Dashboard</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Default
