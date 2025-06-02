import {
  createUser,
  listUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '@/crud';

const args = process.argv.slice(2);
const command = args.shift();

switch (command) {
  case 'create': {
    const [firstName, lastName, ageStr] = args;
    const age = Number(ageStr);
    if (!firstName || !lastName || isNaN(age)) {
      console.log('❌ Please provide: firstName lastName age');
      break;
    }
    const user = createUser(firstName, lastName, age);
    console.log('✅ Created:', user);
    break;
  }

  case 'read': {
    const users = listUsers();
    console.log('📄 All Users:');
    users.forEach((u) =>
      console.log(`${u.id}: ${u.firstName} ${u.lastName} (${u.age})`)
    );
    break;
  }

  case 'get': {
    const [id] = args;
    const user = getUserById(id);
    if (user) console.log('🔍 Found:', user);
    else console.log('❌ User not found');
    break;
  }

  case 'update': {
    const [id, firstName, lastName, ageStr] = args;
    const age = ageStr ? Number(ageStr) : undefined;
    const updated = updateUser(id, {
      firstName,
      lastName,
      age: isNaN(age!) ? undefined : age,
    });
    if (updated) console.log('🔁 Updated:', updated);
    else console.log('❌ User not found');
    break;
  }

  case 'delete': {
    const [id] = args;
    const success = deleteUser(id);
    if (success) console.log('🗑️ User deleted');
    else console.log('❌ User not found');
    break;
  }

  default:
    console.log(
      '❓Available commands:\n  create <firstName> <lastName> <age>\n  read\n  get <id>\n  update <id> <firstName> <lastName> <age>\n  delete <id>'
    );
}
