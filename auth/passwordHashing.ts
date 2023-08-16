import argon2 from 'argon2'
import { PasswordHashingError, PasswordVerificationError } from '../errors/auth'

export async function hashPassword(password: string): Promise<string> {
  try {
    const hash = await argon2.hash(password)
    return hash
  } catch (error: any) {
    console.error('Error hashing password:', error)
    throw new PasswordHashingError()
  }
}

/**
 * @param hash Hashed password
 * @param password Password to verify
 */
export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  try {
    const isValid = await argon2.verify(hash, password)
    return isValid
  } catch (error: any) {
    console.error('Error verifying password:', error)
    throw new PasswordVerificationError()
  }
}
