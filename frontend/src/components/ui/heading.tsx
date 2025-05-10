
interface HeadingProps {
    title: string,
    description: string,
}

const Heading = ({
    title,
    description,
}: HeadingProps) => {
    return (
        <>
            <div>
                <h2 className="text-3xl text-black font-bold tracking-tight mb-6">
                    {title}
                </h2>
                <p className="text-sm text-muted-foreground mb-2.5">
                    {description}
                </p>
            </div>

        </>
    )
}

export default Heading