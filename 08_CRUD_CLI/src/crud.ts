import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
};

const filePath = path.join(__dirname, 'data', 'users.json');

function ensureFile() {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync('src/data');
    fs.writeFileSync(filePath, '[]');
  }
}

export function readUsers(): User[] {
  ensureFile();
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

export function writeUsers(users: User[]): void {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

export function createUser(
  firstName: string,
  lastName: string,
  age: number
): User {
  const users = readUsers();
  const newUser: User = {
    id: randomUUID(),
    firstName,
    lastName,
    age,
  };
  users.push(newUser);
  writeUsers(users);
  return newUser;
}

export function listUsers(): User[] {
  return readUsers();
}

export function getUserById(id: string): User | undefined {
  return readUsers().find((u) => u.id === id);
}

export function updateUser(
  id: string,
  updatedData: Partial<Omit<User, 'id'>>
): User | null {
  const users = readUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...updatedData };
  writeUsers(users);
  return users[index];
}

export function deleteUser(id: string): boolean {
  const users = readUsers();
  const filtered = users.filter((u) => u.id !== id);
  if (users.length === filtered.length) return false;
  writeUsers(filtered);
  return true;
}
