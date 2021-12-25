import { SortDirection } from '../models/GlobalModels';

const sort = (array: any[], direction: SortDirection, sortBy: string) => {
    if (direction === SortDirection.ASC) {
        return array.sort((a, b) => (a.tasks[sortBy] > b.tasks[sortBy] ? 1 : -1));
    } else {
        return array.sort((a, b) => (a.tasks[sortBy] > b.tasks[sortBy] ? -1 : 1));
    }
};

const SortUtilities = { sort };

export default SortUtilities;
