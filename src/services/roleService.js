import axios from '../setup/axios.js';
const createRoles = async (roles) => {
    return await axios.post('/api/v1/role/create', [...roles]);
}
const fetchAllRole = async () => {
    return await axios.get('/api/v1/role/read');
}
const deleteRole = async (role) => {
    return await axios.delete('/api/v1/role/delete', { data: { id: role.id } })
}
const fetchRolesByGroup = async (groupId) => {
    return await axios.get(`/api/v1/role/by-group/${groupId}`);
}
const assignRolesToGroup = async (data) => {
    return await axios.post('/api/v1/role/assign-to-group', { data });
}
export {
    createRoles,
    fetchAllRole,
    deleteRole,
    fetchRolesByGroup,
    assignRolesToGroup
}