import Loading from "../../../components/Loading"
import Heading from "../../../components/ui/heading"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import UnauthorizedPage from "../../../components/Unauthorized"
import { useAdmin } from "../../../hooks/use-admin"
import { AccountSettings } from "./components/account-settings"
import { AppearanceSettings } from "./components/appearance-settings"
import { ProfileSettings } from "./components/profile-settings"
import SignOut from "./components/sign-out"


export default function SettingsPage() {
    const { admin, loading } = useAdmin();

    if (loading) {
        return <>
            <div className=" min-h-screen flex justify-center items-center">
                <Loading />
            </div>
        </>
    }

    if (!admin) {
        return (
            <UnauthorizedPage />
        )
    }


    return (
        <div className="container mx-auto py-10">
            <div className="mb-8">
                <Heading
                    title="Settings"
                    description="Manage your account settings and preferences."
                />
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8 ">
                    <TabsTrigger value="profile" className="hover:cursor-pointer">Profile</TabsTrigger>
                    <TabsTrigger value="account" className="hover:cursor-pointer">Account</TabsTrigger>
                    <TabsTrigger value="appearance" className="hover:cursor-pointer">Appearance</TabsTrigger>
                    <TabsTrigger value="sign-out" className="hover:cursor-pointer">Sign Out</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                    <ProfileSettings
                        admin={{ ...admin, name: admin.name || "John Doe" }}
                    />
                </TabsContent>
                <TabsContent value="account" >
                    <AccountSettings />
                </TabsContent>
                <TabsContent value="appearance">
                    <AppearanceSettings />
                </TabsContent>
                <TabsContent value="sign-out">
                    <SignOut />
                </TabsContent>
            </Tabs>
        </div>
    )
}
