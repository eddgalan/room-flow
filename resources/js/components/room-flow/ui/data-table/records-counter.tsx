type Props = {
    records?: number;
};

export default function RecordsCounter({ records = 0 }: Props) {
    const label = records === 1 ? 'Record found' : 'Records found';

    return (
        <div className="flex flex-1 items-center gap-2 text-sm">
            <span className="whitespace-nowrap text-muted-foreground">
                {records} {label}
            </span>
        </div>
    );
}
