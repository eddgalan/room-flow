import { Checkbox } from '@/components/ui/checkbox';
import type { Resource } from '@/types/room-flow/resource';
import type { Role } from '@/types/room-flow/role';

type Props = {
    resources?: Resource[];
    role?: Role;
};

export default function ResourcesTable({
    resources = [],
    role,
}: Props) {
    const roleResourceIds = new Set(
        role?.resources?.map((resource) => resource.id),
    );

    return (
        <table className="w-full table-auto">
            <thead className="border">
                <tr>
                    <th className="border px-3 py-2 text-left">Enabled</th>
                    <th className="border px-3 py-2 text-left">Resource</th>
                    <th className="border px-3 py-2 text-left">
                        Description
                    </th>
                </tr>
            </thead>
            <tbody>
                {resources.map((resource) => (
                    <tr key={resource.id} className="border">
                        <td className="border px-3 py-2 text-center">
                            <Checkbox
                                className="mx-auto"
                                name="resources[]"
                                value={resource.name}
                                defaultChecked={roleResourceIds.has(
                                    resource.id,
                                )}
                                disabled={ role?.name === 'administrator'}
                            />
                        </td>
                        <td className="border px-3 py-2 font-stretch-normal">{resource.name}</td>
                        <td className="border px-3 py-2 text-small">
                            {resource.description}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
