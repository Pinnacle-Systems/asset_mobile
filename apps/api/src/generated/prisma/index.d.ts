
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model settings
 * 
 */
export type settings = $Result.DefaultSelection<Prisma.$settingsPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model CompanyCode
 * 
 */
export type CompanyCode = $Result.DefaultSelection<Prisma.$CompanyCodePayload>
/**
 * Model Role
 * 
 */
export type Role = $Result.DefaultSelection<Prisma.$RolePayload>
/**
 * Model RoleOnPage
 * 
 */
export type RoleOnPage = $Result.DefaultSelection<Prisma.$RoleOnPagePayload>
/**
 * Model UserLog
 * 
 */
export type UserLog = $Result.DefaultSelection<Prisma.$UserLogPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Settings
 * const settings = await prisma.settings.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Settings
   * const settings = await prisma.settings.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.settings`: Exposes CRUD operations for the **settings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Settings
    * const settings = await prisma.settings.findMany()
    * ```
    */
  get settings(): Prisma.settingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.companyCode`: Exposes CRUD operations for the **CompanyCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CompanyCodes
    * const companyCodes = await prisma.companyCode.findMany()
    * ```
    */
  get companyCode(): Prisma.CompanyCodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.role`: Exposes CRUD operations for the **Role** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.role.findMany()
    * ```
    */
  get role(): Prisma.RoleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roleOnPage`: Exposes CRUD operations for the **RoleOnPage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoleOnPages
    * const roleOnPages = await prisma.roleOnPage.findMany()
    * ```
    */
  get roleOnPage(): Prisma.RoleOnPageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userLog`: Exposes CRUD operations for the **UserLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserLogs
    * const userLogs = await prisma.userLog.findMany()
    * ```
    */
  get userLog(): Prisma.UserLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    settings: 'settings',
    User: 'User',
    CompanyCode: 'CompanyCode',
    Role: 'Role',
    RoleOnPage: 'RoleOnPage',
    UserLog: 'UserLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "settings" | "user" | "companyCode" | "role" | "roleOnPage" | "userLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      settings: {
        payload: Prisma.$settingsPayload<ExtArgs>
        fields: Prisma.settingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.settingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$settingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.settingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$settingsPayload>
          }
          findFirst: {
            args: Prisma.settingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$settingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.settingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$settingsPayload>
          }
          findMany: {
            args: Prisma.settingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$settingsPayload>[]
          }
          create: {
            args: Prisma.settingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$settingsPayload>
          }
          createMany: {
            args: Prisma.settingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.settingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$settingsPayload>
          }
          update: {
            args: Prisma.settingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$settingsPayload>
          }
          deleteMany: {
            args: Prisma.settingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.settingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.settingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$settingsPayload>
          }
          aggregate: {
            args: Prisma.SettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSettings>
          }
          groupBy: {
            args: Prisma.settingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<SettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.settingsCountArgs<ExtArgs>
            result: $Utils.Optional<SettingsCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      CompanyCode: {
        payload: Prisma.$CompanyCodePayload<ExtArgs>
        fields: Prisma.CompanyCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyCodePayload>
          }
          findFirst: {
            args: Prisma.CompanyCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyCodePayload>
          }
          findMany: {
            args: Prisma.CompanyCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyCodePayload>[]
          }
          create: {
            args: Prisma.CompanyCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyCodePayload>
          }
          createMany: {
            args: Prisma.CompanyCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CompanyCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyCodePayload>
          }
          update: {
            args: Prisma.CompanyCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyCodePayload>
          }
          deleteMany: {
            args: Prisma.CompanyCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CompanyCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyCodePayload>
          }
          aggregate: {
            args: Prisma.CompanyCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompanyCode>
          }
          groupBy: {
            args: Prisma.CompanyCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyCodeCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCodeCountAggregateOutputType> | number
          }
        }
      }
      Role: {
        payload: Prisma.$RolePayload<ExtArgs>
        fields: Prisma.RoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findFirst: {
            args: Prisma.RoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findMany: {
            args: Prisma.RoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          create: {
            args: Prisma.RoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          createMany: {
            args: Prisma.RoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          update: {
            args: Prisma.RoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          deleteMany: {
            args: Prisma.RoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          aggregate: {
            args: Prisma.RoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRole>
          }
          groupBy: {
            args: Prisma.RoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoleCountArgs<ExtArgs>
            result: $Utils.Optional<RoleCountAggregateOutputType> | number
          }
        }
      }
      RoleOnPage: {
        payload: Prisma.$RoleOnPagePayload<ExtArgs>
        fields: Prisma.RoleOnPageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoleOnPageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleOnPagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoleOnPageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleOnPagePayload>
          }
          findFirst: {
            args: Prisma.RoleOnPageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleOnPagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoleOnPageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleOnPagePayload>
          }
          findMany: {
            args: Prisma.RoleOnPageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleOnPagePayload>[]
          }
          create: {
            args: Prisma.RoleOnPageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleOnPagePayload>
          }
          createMany: {
            args: Prisma.RoleOnPageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RoleOnPageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleOnPagePayload>
          }
          update: {
            args: Prisma.RoleOnPageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleOnPagePayload>
          }
          deleteMany: {
            args: Prisma.RoleOnPageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoleOnPageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoleOnPageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleOnPagePayload>
          }
          aggregate: {
            args: Prisma.RoleOnPageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoleOnPage>
          }
          groupBy: {
            args: Prisma.RoleOnPageGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoleOnPageGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoleOnPageCountArgs<ExtArgs>
            result: $Utils.Optional<RoleOnPageCountAggregateOutputType> | number
          }
        }
      }
      UserLog: {
        payload: Prisma.$UserLogPayload<ExtArgs>
        fields: Prisma.UserLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLogPayload>
          }
          findFirst: {
            args: Prisma.UserLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLogPayload>
          }
          findMany: {
            args: Prisma.UserLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLogPayload>[]
          }
          create: {
            args: Prisma.UserLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLogPayload>
          }
          createMany: {
            args: Prisma.UserLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLogPayload>
          }
          update: {
            args: Prisma.UserLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLogPayload>
          }
          deleteMany: {
            args: Prisma.UserLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLogPayload>
          }
          aggregate: {
            args: Prisma.UserLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserLog>
          }
          groupBy: {
            args: Prisma.UserLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserLogCountArgs<ExtArgs>
            result: $Utils.Optional<UserLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    settings?: settingsOmit
    user?: UserOmit
    companyCode?: CompanyCodeOmit
    role?: RoleOmit
    roleOnPage?: RoleOnPageOmit
    userLog?: UserLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    Companies: number
    settings: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Companies?: boolean | UserCountOutputTypeCountCompaniesArgs
    settings?: boolean | UserCountOutputTypeCountSettingsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCompaniesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyCodeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSettingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: settingsWhereInput
  }


  /**
   * Count Type RoleCountOutputType
   */

  export type RoleCountOutputType = {
    User: number
    RoleOnPage: number
  }

  export type RoleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | RoleCountOutputTypeCountUserArgs
    RoleOnPage?: boolean | RoleCountOutputTypeCountRoleOnPageArgs
  }

  // Custom InputTypes
  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleCountOutputType
     */
    select?: RoleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountRoleOnPageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleOnPageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model settings
   */

  export type AggregateSettings = {
    _count: SettingsCountAggregateOutputType | null
    _avg: SettingsAvgAggregateOutputType | null
    _sum: SettingsSumAggregateOutputType | null
    _min: SettingsMinAggregateOutputType | null
    _max: SettingsMaxAggregateOutputType | null
  }

  export type SettingsAvgAggregateOutputType = {
    SettingId: number | null
  }

  export type SettingsSumAggregateOutputType = {
    SettingId: number | null
  }

  export type SettingsMinAggregateOutputType = {
    SettingId: number | null
    UserId: string | null
    Notification: boolean | null
    BioMatrics: boolean | null
    COMPCODE: string | null
  }

  export type SettingsMaxAggregateOutputType = {
    SettingId: number | null
    UserId: string | null
    Notification: boolean | null
    BioMatrics: boolean | null
    COMPCODE: string | null
  }

  export type SettingsCountAggregateOutputType = {
    SettingId: number
    UserId: number
    Notification: number
    BioMatrics: number
    COMPCODE: number
    _all: number
  }


  export type SettingsAvgAggregateInputType = {
    SettingId?: true
  }

  export type SettingsSumAggregateInputType = {
    SettingId?: true
  }

  export type SettingsMinAggregateInputType = {
    SettingId?: true
    UserId?: true
    Notification?: true
    BioMatrics?: true
    COMPCODE?: true
  }

  export type SettingsMaxAggregateInputType = {
    SettingId?: true
    UserId?: true
    Notification?: true
    BioMatrics?: true
    COMPCODE?: true
  }

  export type SettingsCountAggregateInputType = {
    SettingId?: true
    UserId?: true
    Notification?: true
    BioMatrics?: true
    COMPCODE?: true
    _all?: true
  }

  export type SettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which settings to aggregate.
     */
    where?: settingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of settings to fetch.
     */
    orderBy?: settingsOrderByWithRelationInput | settingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: settingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned settings
    **/
    _count?: true | SettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SettingsMaxAggregateInputType
  }

  export type GetSettingsAggregateType<T extends SettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSettings[P]>
      : GetScalarType<T[P], AggregateSettings[P]>
  }




  export type settingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: settingsWhereInput
    orderBy?: settingsOrderByWithAggregationInput | settingsOrderByWithAggregationInput[]
    by: SettingsScalarFieldEnum[] | SettingsScalarFieldEnum
    having?: settingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SettingsCountAggregateInputType | true
    _avg?: SettingsAvgAggregateInputType
    _sum?: SettingsSumAggregateInputType
    _min?: SettingsMinAggregateInputType
    _max?: SettingsMaxAggregateInputType
  }

  export type SettingsGroupByOutputType = {
    SettingId: number
    UserId: string
    Notification: boolean | null
    BioMatrics: boolean | null
    COMPCODE: string | null
    _count: SettingsCountAggregateOutputType | null
    _avg: SettingsAvgAggregateOutputType | null
    _sum: SettingsSumAggregateOutputType | null
    _min: SettingsMinAggregateOutputType | null
    _max: SettingsMaxAggregateOutputType | null
  }

  type GetSettingsGroupByPayload<T extends settingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SettingsGroupByOutputType[P]>
            : GetScalarType<T[P], SettingsGroupByOutputType[P]>
        }
      >
    >


  export type settingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    SettingId?: boolean
    UserId?: boolean
    Notification?: boolean
    BioMatrics?: boolean
    COMPCODE?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["settings"]>



  export type settingsSelectScalar = {
    SettingId?: boolean
    UserId?: boolean
    Notification?: boolean
    BioMatrics?: boolean
    COMPCODE?: boolean
  }

  export type settingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"SettingId" | "UserId" | "Notification" | "BioMatrics" | "COMPCODE", ExtArgs["result"]["settings"]>
  export type settingsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $settingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "settings"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      SettingId: number
      UserId: string
      Notification: boolean | null
      BioMatrics: boolean | null
      COMPCODE: string | null
    }, ExtArgs["result"]["settings"]>
    composites: {}
  }

  type settingsGetPayload<S extends boolean | null | undefined | settingsDefaultArgs> = $Result.GetResult<Prisma.$settingsPayload, S>

  type settingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<settingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SettingsCountAggregateInputType | true
    }

  export interface settingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['settings'], meta: { name: 'settings' } }
    /**
     * Find zero or one Settings that matches the filter.
     * @param {settingsFindUniqueArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends settingsFindUniqueArgs>(args: SelectSubset<T, settingsFindUniqueArgs<ExtArgs>>): Prisma__settingsClient<$Result.GetResult<Prisma.$settingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Settings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {settingsFindUniqueOrThrowArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends settingsFindUniqueOrThrowArgs>(args: SelectSubset<T, settingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__settingsClient<$Result.GetResult<Prisma.$settingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {settingsFindFirstArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends settingsFindFirstArgs>(args?: SelectSubset<T, settingsFindFirstArgs<ExtArgs>>): Prisma__settingsClient<$Result.GetResult<Prisma.$settingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Settings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {settingsFindFirstOrThrowArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends settingsFindFirstOrThrowArgs>(args?: SelectSubset<T, settingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__settingsClient<$Result.GetResult<Prisma.$settingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {settingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Settings
     * const settings = await prisma.settings.findMany()
     * 
     * // Get first 10 Settings
     * const settings = await prisma.settings.findMany({ take: 10 })
     * 
     * // Only select the `SettingId`
     * const settingsWithSettingIdOnly = await prisma.settings.findMany({ select: { SettingId: true } })
     * 
     */
    findMany<T extends settingsFindManyArgs>(args?: SelectSubset<T, settingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$settingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Settings.
     * @param {settingsCreateArgs} args - Arguments to create a Settings.
     * @example
     * // Create one Settings
     * const Settings = await prisma.settings.create({
     *   data: {
     *     // ... data to create a Settings
     *   }
     * })
     * 
     */
    create<T extends settingsCreateArgs>(args: SelectSubset<T, settingsCreateArgs<ExtArgs>>): Prisma__settingsClient<$Result.GetResult<Prisma.$settingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Settings.
     * @param {settingsCreateManyArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const settings = await prisma.settings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends settingsCreateManyArgs>(args?: SelectSubset<T, settingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Settings.
     * @param {settingsDeleteArgs} args - Arguments to delete one Settings.
     * @example
     * // Delete one Settings
     * const Settings = await prisma.settings.delete({
     *   where: {
     *     // ... filter to delete one Settings
     *   }
     * })
     * 
     */
    delete<T extends settingsDeleteArgs>(args: SelectSubset<T, settingsDeleteArgs<ExtArgs>>): Prisma__settingsClient<$Result.GetResult<Prisma.$settingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Settings.
     * @param {settingsUpdateArgs} args - Arguments to update one Settings.
     * @example
     * // Update one Settings
     * const settings = await prisma.settings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends settingsUpdateArgs>(args: SelectSubset<T, settingsUpdateArgs<ExtArgs>>): Prisma__settingsClient<$Result.GetResult<Prisma.$settingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Settings.
     * @param {settingsDeleteManyArgs} args - Arguments to filter Settings to delete.
     * @example
     * // Delete a few Settings
     * const { count } = await prisma.settings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends settingsDeleteManyArgs>(args?: SelectSubset<T, settingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {settingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Settings
     * const settings = await prisma.settings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends settingsUpdateManyArgs>(args: SelectSubset<T, settingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Settings.
     * @param {settingsUpsertArgs} args - Arguments to update or create a Settings.
     * @example
     * // Update or create a Settings
     * const settings = await prisma.settings.upsert({
     *   create: {
     *     // ... data to create a Settings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Settings we want to update
     *   }
     * })
     */
    upsert<T extends settingsUpsertArgs>(args: SelectSubset<T, settingsUpsertArgs<ExtArgs>>): Prisma__settingsClient<$Result.GetResult<Prisma.$settingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {settingsCountArgs} args - Arguments to filter Settings to count.
     * @example
     * // Count the number of Settings
     * const count = await prisma.settings.count({
     *   where: {
     *     // ... the filter for the Settings we want to count
     *   }
     * })
    **/
    count<T extends settingsCountArgs>(
      args?: Subset<T, settingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SettingsAggregateArgs>(args: Subset<T, SettingsAggregateArgs>): Prisma.PrismaPromise<GetSettingsAggregateType<T>>

    /**
     * Group by Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {settingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends settingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: settingsGroupByArgs['orderBy'] }
        : { orderBy?: settingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, settingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the settings model
   */
  readonly fields: settingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for settings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__settingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the settings model
   */
  interface settingsFieldRefs {
    readonly SettingId: FieldRef<"settings", 'Int'>
    readonly UserId: FieldRef<"settings", 'String'>
    readonly Notification: FieldRef<"settings", 'Boolean'>
    readonly BioMatrics: FieldRef<"settings", 'Boolean'>
    readonly COMPCODE: FieldRef<"settings", 'String'>
  }
    

  // Custom InputTypes
  /**
   * settings findUnique
   */
  export type settingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the settings
     */
    select?: settingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the settings
     */
    omit?: settingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: settingsInclude<ExtArgs> | null
    /**
     * Filter, which settings to fetch.
     */
    where: settingsWhereUniqueInput
  }

  /**
   * settings findUniqueOrThrow
   */
  export type settingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the settings
     */
    select?: settingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the settings
     */
    omit?: settingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: settingsInclude<ExtArgs> | null
    /**
     * Filter, which settings to fetch.
     */
    where: settingsWhereUniqueInput
  }

  /**
   * settings findFirst
   */
  export type settingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the settings
     */
    select?: settingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the settings
     */
    omit?: settingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: settingsInclude<ExtArgs> | null
    /**
     * Filter, which settings to fetch.
     */
    where?: settingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of settings to fetch.
     */
    orderBy?: settingsOrderByWithRelationInput | settingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for settings.
     */
    cursor?: settingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of settings.
     */
    distinct?: SettingsScalarFieldEnum | SettingsScalarFieldEnum[]
  }

  /**
   * settings findFirstOrThrow
   */
  export type settingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the settings
     */
    select?: settingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the settings
     */
    omit?: settingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: settingsInclude<ExtArgs> | null
    /**
     * Filter, which settings to fetch.
     */
    where?: settingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of settings to fetch.
     */
    orderBy?: settingsOrderByWithRelationInput | settingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for settings.
     */
    cursor?: settingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of settings.
     */
    distinct?: SettingsScalarFieldEnum | SettingsScalarFieldEnum[]
  }

  /**
   * settings findMany
   */
  export type settingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the settings
     */
    select?: settingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the settings
     */
    omit?: settingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: settingsInclude<ExtArgs> | null
    /**
     * Filter, which settings to fetch.
     */
    where?: settingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of settings to fetch.
     */
    orderBy?: settingsOrderByWithRelationInput | settingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing settings.
     */
    cursor?: settingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of settings.
     */
    distinct?: SettingsScalarFieldEnum | SettingsScalarFieldEnum[]
  }

  /**
   * settings create
   */
  export type settingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the settings
     */
    select?: settingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the settings
     */
    omit?: settingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: settingsInclude<ExtArgs> | null
    /**
     * The data needed to create a settings.
     */
    data: XOR<settingsCreateInput, settingsUncheckedCreateInput>
  }

  /**
   * settings createMany
   */
  export type settingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many settings.
     */
    data: settingsCreateManyInput | settingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * settings update
   */
  export type settingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the settings
     */
    select?: settingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the settings
     */
    omit?: settingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: settingsInclude<ExtArgs> | null
    /**
     * The data needed to update a settings.
     */
    data: XOR<settingsUpdateInput, settingsUncheckedUpdateInput>
    /**
     * Choose, which settings to update.
     */
    where: settingsWhereUniqueInput
  }

  /**
   * settings updateMany
   */
  export type settingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update settings.
     */
    data: XOR<settingsUpdateManyMutationInput, settingsUncheckedUpdateManyInput>
    /**
     * Filter which settings to update
     */
    where?: settingsWhereInput
    /**
     * Limit how many settings to update.
     */
    limit?: number
  }

  /**
   * settings upsert
   */
  export type settingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the settings
     */
    select?: settingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the settings
     */
    omit?: settingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: settingsInclude<ExtArgs> | null
    /**
     * The filter to search for the settings to update in case it exists.
     */
    where: settingsWhereUniqueInput
    /**
     * In case the settings found by the `where` argument doesn't exist, create a new settings with this data.
     */
    create: XOR<settingsCreateInput, settingsUncheckedCreateInput>
    /**
     * In case the settings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<settingsUpdateInput, settingsUncheckedUpdateInput>
  }

  /**
   * settings delete
   */
  export type settingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the settings
     */
    select?: settingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the settings
     */
    omit?: settingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: settingsInclude<ExtArgs> | null
    /**
     * Filter which settings to delete.
     */
    where: settingsWhereUniqueInput
  }

  /**
   * settings deleteMany
   */
  export type settingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which settings to delete
     */
    where?: settingsWhereInput
    /**
     * Limit how many settings to delete.
     */
    limit?: number
  }

  /**
   * settings without action
   */
  export type settingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the settings
     */
    select?: settingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the settings
     */
    omit?: settingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: settingsInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    employeeId: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    employeeId: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    username: string | null
    pic: string | null
    email: string | null
    otpemail: string | null
    approval: string | null
    password: string | null
    Idcard: string | null
    roleId: string | null
    otp: string | null
    hod: string | null
    hr: string | null
    level: string | null
    verificationOtp: string | null
    expiresAt: Date | null
    createdAt: Date | null
    active: boolean | null
    employeeId: number | null
    isAllParty: boolean | null
    isAdmin: boolean | null
    fcm: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    username: string | null
    pic: string | null
    email: string | null
    otpemail: string | null
    approval: string | null
    password: string | null
    Idcard: string | null
    roleId: string | null
    otp: string | null
    hod: string | null
    hr: string | null
    level: string | null
    verificationOtp: string | null
    expiresAt: Date | null
    createdAt: Date | null
    active: boolean | null
    employeeId: number | null
    isAllParty: boolean | null
    isAdmin: boolean | null
    fcm: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    pic: number
    email: number
    otpemail: number
    approval: number
    password: number
    Idcard: number
    roleId: number
    otp: number
    hod: number
    hr: number
    level: number
    verificationOtp: number
    expiresAt: number
    createdAt: number
    active: number
    employeeId: number
    isAllParty: number
    isAdmin: number
    fcm: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    employeeId?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    employeeId?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    pic?: true
    email?: true
    otpemail?: true
    approval?: true
    password?: true
    Idcard?: true
    roleId?: true
    otp?: true
    hod?: true
    hr?: true
    level?: true
    verificationOtp?: true
    expiresAt?: true
    createdAt?: true
    active?: true
    employeeId?: true
    isAllParty?: true
    isAdmin?: true
    fcm?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    pic?: true
    email?: true
    otpemail?: true
    approval?: true
    password?: true
    Idcard?: true
    roleId?: true
    otp?: true
    hod?: true
    hr?: true
    level?: true
    verificationOtp?: true
    expiresAt?: true
    createdAt?: true
    active?: true
    employeeId?: true
    isAllParty?: true
    isAdmin?: true
    fcm?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    pic?: true
    email?: true
    otpemail?: true
    approval?: true
    password?: true
    Idcard?: true
    roleId?: true
    otp?: true
    hod?: true
    hr?: true
    level?: true
    verificationOtp?: true
    expiresAt?: true
    createdAt?: true
    active?: true
    employeeId?: true
    isAllParty?: true
    isAdmin?: true
    fcm?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    username: string
    pic: string | null
    email: string | null
    otpemail: string | null
    approval: string
    password: string | null
    Idcard: string | null
    roleId: string | null
    otp: string | null
    hod: string | null
    hr: string | null
    level: string
    verificationOtp: string | null
    expiresAt: Date | null
    createdAt: Date | null
    active: boolean
    employeeId: number | null
    isAllParty: boolean
    isAdmin: boolean
    fcm: string | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    pic?: boolean
    email?: boolean
    otpemail?: boolean
    approval?: boolean
    password?: boolean
    Idcard?: boolean
    roleId?: boolean
    otp?: boolean
    hod?: boolean
    hr?: boolean
    level?: boolean
    verificationOtp?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    active?: boolean
    employeeId?: boolean
    isAllParty?: boolean
    isAdmin?: boolean
    fcm?: boolean
    role?: boolean | User$roleArgs<ExtArgs>
    Companies?: boolean | User$CompaniesArgs<ExtArgs>
    settings?: boolean | User$settingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    pic?: boolean
    email?: boolean
    otpemail?: boolean
    approval?: boolean
    password?: boolean
    Idcard?: boolean
    roleId?: boolean
    otp?: boolean
    hod?: boolean
    hr?: boolean
    level?: boolean
    verificationOtp?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    active?: boolean
    employeeId?: boolean
    isAllParty?: boolean
    isAdmin?: boolean
    fcm?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "pic" | "email" | "otpemail" | "approval" | "password" | "Idcard" | "roleId" | "otp" | "hod" | "hr" | "level" | "verificationOtp" | "expiresAt" | "createdAt" | "active" | "employeeId" | "isAllParty" | "isAdmin" | "fcm", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | User$roleArgs<ExtArgs>
    Companies?: boolean | User$CompaniesArgs<ExtArgs>
    settings?: boolean | User$settingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      role: Prisma.$RolePayload<ExtArgs> | null
      Companies: Prisma.$CompanyCodePayload<ExtArgs>[]
      settings: Prisma.$settingsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      pic: string | null
      email: string | null
      otpemail: string | null
      approval: string
      password: string | null
      Idcard: string | null
      roleId: string | null
      otp: string | null
      hod: string | null
      hr: string | null
      level: string
      verificationOtp: string | null
      expiresAt: Date | null
      createdAt: Date | null
      active: boolean
      employeeId: number | null
      isAllParty: boolean
      isAdmin: boolean
      fcm: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    role<T extends User$roleArgs<ExtArgs> = {}>(args?: Subset<T, User$roleArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    Companies<T extends User$CompaniesArgs<ExtArgs> = {}>(args?: Subset<T, User$CompaniesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    settings<T extends User$settingsArgs<ExtArgs> = {}>(args?: Subset<T, User$settingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$settingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly username: FieldRef<"User", 'String'>
    readonly pic: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly otpemail: FieldRef<"User", 'String'>
    readonly approval: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly Idcard: FieldRef<"User", 'String'>
    readonly roleId: FieldRef<"User", 'String'>
    readonly otp: FieldRef<"User", 'String'>
    readonly hod: FieldRef<"User", 'String'>
    readonly hr: FieldRef<"User", 'String'>
    readonly level: FieldRef<"User", 'String'>
    readonly verificationOtp: FieldRef<"User", 'String'>
    readonly expiresAt: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly active: FieldRef<"User", 'Boolean'>
    readonly employeeId: FieldRef<"User", 'Int'>
    readonly isAllParty: FieldRef<"User", 'Boolean'>
    readonly isAdmin: FieldRef<"User", 'Boolean'>
    readonly fcm: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.role
   */
  export type User$roleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    where?: RoleWhereInput
  }

  /**
   * User.Companies
   */
  export type User$CompaniesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCode
     */
    select?: CompanyCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyCode
     */
    omit?: CompanyCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyCodeInclude<ExtArgs> | null
    where?: CompanyCodeWhereInput
    orderBy?: CompanyCodeOrderByWithRelationInput | CompanyCodeOrderByWithRelationInput[]
    cursor?: CompanyCodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CompanyCodeScalarFieldEnum | CompanyCodeScalarFieldEnum[]
  }

  /**
   * User.settings
   */
  export type User$settingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the settings
     */
    select?: settingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the settings
     */
    omit?: settingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: settingsInclude<ExtArgs> | null
    where?: settingsWhereInput
    orderBy?: settingsOrderByWithRelationInput | settingsOrderByWithRelationInput[]
    cursor?: settingsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SettingsScalarFieldEnum | SettingsScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model CompanyCode
   */

  export type AggregateCompanyCode = {
    _count: CompanyCodeCountAggregateOutputType | null
    _avg: CompanyCodeAvgAggregateOutputType | null
    _sum: CompanyCodeSumAggregateOutputType | null
    _min: CompanyCodeMinAggregateOutputType | null
    _max: CompanyCodeMaxAggregateOutputType | null
  }

  export type CompanyCodeAvgAggregateOutputType = {
    id: number | null
  }

  export type CompanyCodeSumAggregateOutputType = {
    id: number | null
  }

  export type CompanyCodeMinAggregateOutputType = {
    id: number | null
    Idcard: string | null
    companyCode: string | null
    GCOMP: string | null
    companyid: string | null
  }

  export type CompanyCodeMaxAggregateOutputType = {
    id: number | null
    Idcard: string | null
    companyCode: string | null
    GCOMP: string | null
    companyid: string | null
  }

  export type CompanyCodeCountAggregateOutputType = {
    id: number
    Idcard: number
    companyCode: number
    GCOMP: number
    companyid: number
    _all: number
  }


  export type CompanyCodeAvgAggregateInputType = {
    id?: true
  }

  export type CompanyCodeSumAggregateInputType = {
    id?: true
  }

  export type CompanyCodeMinAggregateInputType = {
    id?: true
    Idcard?: true
    companyCode?: true
    GCOMP?: true
    companyid?: true
  }

  export type CompanyCodeMaxAggregateInputType = {
    id?: true
    Idcard?: true
    companyCode?: true
    GCOMP?: true
    companyid?: true
  }

  export type CompanyCodeCountAggregateInputType = {
    id?: true
    Idcard?: true
    companyCode?: true
    GCOMP?: true
    companyid?: true
    _all?: true
  }

  export type CompanyCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanyCode to aggregate.
     */
    where?: CompanyCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyCodes to fetch.
     */
    orderBy?: CompanyCodeOrderByWithRelationInput | CompanyCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CompanyCodes
    **/
    _count?: true | CompanyCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CompanyCodeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CompanyCodeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyCodeMaxAggregateInputType
  }

  export type GetCompanyCodeAggregateType<T extends CompanyCodeAggregateArgs> = {
        [P in keyof T & keyof AggregateCompanyCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompanyCode[P]>
      : GetScalarType<T[P], AggregateCompanyCode[P]>
  }




  export type CompanyCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyCodeWhereInput
    orderBy?: CompanyCodeOrderByWithAggregationInput | CompanyCodeOrderByWithAggregationInput[]
    by: CompanyCodeScalarFieldEnum[] | CompanyCodeScalarFieldEnum
    having?: CompanyCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCodeCountAggregateInputType | true
    _avg?: CompanyCodeAvgAggregateInputType
    _sum?: CompanyCodeSumAggregateInputType
    _min?: CompanyCodeMinAggregateInputType
    _max?: CompanyCodeMaxAggregateInputType
  }

  export type CompanyCodeGroupByOutputType = {
    id: number
    Idcard: string
    companyCode: string
    GCOMP: string | null
    companyid: string
    _count: CompanyCodeCountAggregateOutputType | null
    _avg: CompanyCodeAvgAggregateOutputType | null
    _sum: CompanyCodeSumAggregateOutputType | null
    _min: CompanyCodeMinAggregateOutputType | null
    _max: CompanyCodeMaxAggregateOutputType | null
  }

  type GetCompanyCodeGroupByPayload<T extends CompanyCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyCodeGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyCodeGroupByOutputType[P]>
        }
      >
    >


  export type CompanyCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    Idcard?: boolean
    companyCode?: boolean
    GCOMP?: boolean
    companyid?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["companyCode"]>



  export type CompanyCodeSelectScalar = {
    id?: boolean
    Idcard?: boolean
    companyCode?: boolean
    GCOMP?: boolean
    companyid?: boolean
  }

  export type CompanyCodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "Idcard" | "companyCode" | "GCOMP" | "companyid", ExtArgs["result"]["companyCode"]>
  export type CompanyCodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CompanyCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CompanyCode"
    objects: {
      User: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      Idcard: string
      companyCode: string
      GCOMP: string | null
      companyid: string
    }, ExtArgs["result"]["companyCode"]>
    composites: {}
  }

  type CompanyCodeGetPayload<S extends boolean | null | undefined | CompanyCodeDefaultArgs> = $Result.GetResult<Prisma.$CompanyCodePayload, S>

  type CompanyCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyCodeCountAggregateInputType | true
    }

  export interface CompanyCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CompanyCode'], meta: { name: 'CompanyCode' } }
    /**
     * Find zero or one CompanyCode that matches the filter.
     * @param {CompanyCodeFindUniqueArgs} args - Arguments to find a CompanyCode
     * @example
     * // Get one CompanyCode
     * const companyCode = await prisma.companyCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyCodeFindUniqueArgs>(args: SelectSubset<T, CompanyCodeFindUniqueArgs<ExtArgs>>): Prisma__CompanyCodeClient<$Result.GetResult<Prisma.$CompanyCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CompanyCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyCodeFindUniqueOrThrowArgs} args - Arguments to find a CompanyCode
     * @example
     * // Get one CompanyCode
     * const companyCode = await prisma.companyCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyCodeClient<$Result.GetResult<Prisma.$CompanyCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompanyCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCodeFindFirstArgs} args - Arguments to find a CompanyCode
     * @example
     * // Get one CompanyCode
     * const companyCode = await prisma.companyCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyCodeFindFirstArgs>(args?: SelectSubset<T, CompanyCodeFindFirstArgs<ExtArgs>>): Prisma__CompanyCodeClient<$Result.GetResult<Prisma.$CompanyCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompanyCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCodeFindFirstOrThrowArgs} args - Arguments to find a CompanyCode
     * @example
     * // Get one CompanyCode
     * const companyCode = await prisma.companyCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyCodeClient<$Result.GetResult<Prisma.$CompanyCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CompanyCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CompanyCodes
     * const companyCodes = await prisma.companyCode.findMany()
     * 
     * // Get first 10 CompanyCodes
     * const companyCodes = await prisma.companyCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyCodeWithIdOnly = await prisma.companyCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyCodeFindManyArgs>(args?: SelectSubset<T, CompanyCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CompanyCode.
     * @param {CompanyCodeCreateArgs} args - Arguments to create a CompanyCode.
     * @example
     * // Create one CompanyCode
     * const CompanyCode = await prisma.companyCode.create({
     *   data: {
     *     // ... data to create a CompanyCode
     *   }
     * })
     * 
     */
    create<T extends CompanyCodeCreateArgs>(args: SelectSubset<T, CompanyCodeCreateArgs<ExtArgs>>): Prisma__CompanyCodeClient<$Result.GetResult<Prisma.$CompanyCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CompanyCodes.
     * @param {CompanyCodeCreateManyArgs} args - Arguments to create many CompanyCodes.
     * @example
     * // Create many CompanyCodes
     * const companyCode = await prisma.companyCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyCodeCreateManyArgs>(args?: SelectSubset<T, CompanyCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CompanyCode.
     * @param {CompanyCodeDeleteArgs} args - Arguments to delete one CompanyCode.
     * @example
     * // Delete one CompanyCode
     * const CompanyCode = await prisma.companyCode.delete({
     *   where: {
     *     // ... filter to delete one CompanyCode
     *   }
     * })
     * 
     */
    delete<T extends CompanyCodeDeleteArgs>(args: SelectSubset<T, CompanyCodeDeleteArgs<ExtArgs>>): Prisma__CompanyCodeClient<$Result.GetResult<Prisma.$CompanyCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CompanyCode.
     * @param {CompanyCodeUpdateArgs} args - Arguments to update one CompanyCode.
     * @example
     * // Update one CompanyCode
     * const companyCode = await prisma.companyCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyCodeUpdateArgs>(args: SelectSubset<T, CompanyCodeUpdateArgs<ExtArgs>>): Prisma__CompanyCodeClient<$Result.GetResult<Prisma.$CompanyCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CompanyCodes.
     * @param {CompanyCodeDeleteManyArgs} args - Arguments to filter CompanyCodes to delete.
     * @example
     * // Delete a few CompanyCodes
     * const { count } = await prisma.companyCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyCodeDeleteManyArgs>(args?: SelectSubset<T, CompanyCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanyCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CompanyCodes
     * const companyCode = await prisma.companyCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyCodeUpdateManyArgs>(args: SelectSubset<T, CompanyCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CompanyCode.
     * @param {CompanyCodeUpsertArgs} args - Arguments to update or create a CompanyCode.
     * @example
     * // Update or create a CompanyCode
     * const companyCode = await prisma.companyCode.upsert({
     *   create: {
     *     // ... data to create a CompanyCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CompanyCode we want to update
     *   }
     * })
     */
    upsert<T extends CompanyCodeUpsertArgs>(args: SelectSubset<T, CompanyCodeUpsertArgs<ExtArgs>>): Prisma__CompanyCodeClient<$Result.GetResult<Prisma.$CompanyCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CompanyCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCodeCountArgs} args - Arguments to filter CompanyCodes to count.
     * @example
     * // Count the number of CompanyCodes
     * const count = await prisma.companyCode.count({
     *   where: {
     *     // ... the filter for the CompanyCodes we want to count
     *   }
     * })
    **/
    count<T extends CompanyCodeCountArgs>(
      args?: Subset<T, CompanyCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CompanyCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyCodeAggregateArgs>(args: Subset<T, CompanyCodeAggregateArgs>): Prisma.PrismaPromise<GetCompanyCodeAggregateType<T>>

    /**
     * Group by CompanyCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyCodeGroupByArgs['orderBy'] }
        : { orderBy?: CompanyCodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CompanyCode model
   */
  readonly fields: CompanyCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CompanyCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CompanyCode model
   */
  interface CompanyCodeFieldRefs {
    readonly id: FieldRef<"CompanyCode", 'Int'>
    readonly Idcard: FieldRef<"CompanyCode", 'String'>
    readonly companyCode: FieldRef<"CompanyCode", 'String'>
    readonly GCOMP: FieldRef<"CompanyCode", 'String'>
    readonly companyid: FieldRef<"CompanyCode", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CompanyCode findUnique
   */
  export type CompanyCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCode
     */
    select?: CompanyCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyCode
     */
    omit?: CompanyCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyCodeInclude<ExtArgs> | null
    /**
     * Filter, which CompanyCode to fetch.
     */
    where: CompanyCodeWhereUniqueInput
  }

  /**
   * CompanyCode findUniqueOrThrow
   */
  export type CompanyCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCode
     */
    select?: CompanyCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyCode
     */
    omit?: CompanyCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyCodeInclude<ExtArgs> | null
    /**
     * Filter, which CompanyCode to fetch.
     */
    where: CompanyCodeWhereUniqueInput
  }

  /**
   * CompanyCode findFirst
   */
  export type CompanyCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCode
     */
    select?: CompanyCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyCode
     */
    omit?: CompanyCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyCodeInclude<ExtArgs> | null
    /**
     * Filter, which CompanyCode to fetch.
     */
    where?: CompanyCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyCodes to fetch.
     */
    orderBy?: CompanyCodeOrderByWithRelationInput | CompanyCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyCodes.
     */
    cursor?: CompanyCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyCodes.
     */
    distinct?: CompanyCodeScalarFieldEnum | CompanyCodeScalarFieldEnum[]
  }

  /**
   * CompanyCode findFirstOrThrow
   */
  export type CompanyCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCode
     */
    select?: CompanyCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyCode
     */
    omit?: CompanyCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyCodeInclude<ExtArgs> | null
    /**
     * Filter, which CompanyCode to fetch.
     */
    where?: CompanyCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyCodes to fetch.
     */
    orderBy?: CompanyCodeOrderByWithRelationInput | CompanyCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyCodes.
     */
    cursor?: CompanyCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyCodes.
     */
    distinct?: CompanyCodeScalarFieldEnum | CompanyCodeScalarFieldEnum[]
  }

  /**
   * CompanyCode findMany
   */
  export type CompanyCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCode
     */
    select?: CompanyCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyCode
     */
    omit?: CompanyCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyCodeInclude<ExtArgs> | null
    /**
     * Filter, which CompanyCodes to fetch.
     */
    where?: CompanyCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyCodes to fetch.
     */
    orderBy?: CompanyCodeOrderByWithRelationInput | CompanyCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CompanyCodes.
     */
    cursor?: CompanyCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyCodes.
     */
    distinct?: CompanyCodeScalarFieldEnum | CompanyCodeScalarFieldEnum[]
  }

  /**
   * CompanyCode create
   */
  export type CompanyCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCode
     */
    select?: CompanyCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyCode
     */
    omit?: CompanyCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyCodeInclude<ExtArgs> | null
    /**
     * The data needed to create a CompanyCode.
     */
    data: XOR<CompanyCodeCreateInput, CompanyCodeUncheckedCreateInput>
  }

  /**
   * CompanyCode createMany
   */
  export type CompanyCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CompanyCodes.
     */
    data: CompanyCodeCreateManyInput | CompanyCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CompanyCode update
   */
  export type CompanyCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCode
     */
    select?: CompanyCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyCode
     */
    omit?: CompanyCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyCodeInclude<ExtArgs> | null
    /**
     * The data needed to update a CompanyCode.
     */
    data: XOR<CompanyCodeUpdateInput, CompanyCodeUncheckedUpdateInput>
    /**
     * Choose, which CompanyCode to update.
     */
    where: CompanyCodeWhereUniqueInput
  }

  /**
   * CompanyCode updateMany
   */
  export type CompanyCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CompanyCodes.
     */
    data: XOR<CompanyCodeUpdateManyMutationInput, CompanyCodeUncheckedUpdateManyInput>
    /**
     * Filter which CompanyCodes to update
     */
    where?: CompanyCodeWhereInput
    /**
     * Limit how many CompanyCodes to update.
     */
    limit?: number
  }

  /**
   * CompanyCode upsert
   */
  export type CompanyCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCode
     */
    select?: CompanyCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyCode
     */
    omit?: CompanyCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyCodeInclude<ExtArgs> | null
    /**
     * The filter to search for the CompanyCode to update in case it exists.
     */
    where: CompanyCodeWhereUniqueInput
    /**
     * In case the CompanyCode found by the `where` argument doesn't exist, create a new CompanyCode with this data.
     */
    create: XOR<CompanyCodeCreateInput, CompanyCodeUncheckedCreateInput>
    /**
     * In case the CompanyCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyCodeUpdateInput, CompanyCodeUncheckedUpdateInput>
  }

  /**
   * CompanyCode delete
   */
  export type CompanyCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCode
     */
    select?: CompanyCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyCode
     */
    omit?: CompanyCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyCodeInclude<ExtArgs> | null
    /**
     * Filter which CompanyCode to delete.
     */
    where: CompanyCodeWhereUniqueInput
  }

  /**
   * CompanyCode deleteMany
   */
  export type CompanyCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanyCodes to delete
     */
    where?: CompanyCodeWhereInput
    /**
     * Limit how many CompanyCodes to delete.
     */
    limit?: number
  }

  /**
   * CompanyCode without action
   */
  export type CompanyCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCode
     */
    select?: CompanyCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyCode
     */
    omit?: CompanyCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyCodeInclude<ExtArgs> | null
  }


  /**
   * Model Role
   */

  export type AggregateRole = {
    _count: RoleCountAggregateOutputType | null
    _avg: RoleAvgAggregateOutputType | null
    _sum: RoleSumAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  export type RoleAvgAggregateOutputType = {
    id: number | null
  }

  export type RoleSumAggregateOutputType = {
    id: number | null
  }

  export type RoleMinAggregateOutputType = {
    id: number | null
    name: string | null
    COMPCODE: string | null
    active: string | null
    defaultRole: boolean | null
  }

  export type RoleMaxAggregateOutputType = {
    id: number | null
    name: string | null
    COMPCODE: string | null
    active: string | null
    defaultRole: boolean | null
  }

  export type RoleCountAggregateOutputType = {
    id: number
    name: number
    COMPCODE: number
    active: number
    defaultRole: number
    _all: number
  }


  export type RoleAvgAggregateInputType = {
    id?: true
  }

  export type RoleSumAggregateInputType = {
    id?: true
  }

  export type RoleMinAggregateInputType = {
    id?: true
    name?: true
    COMPCODE?: true
    active?: true
    defaultRole?: true
  }

  export type RoleMaxAggregateInputType = {
    id?: true
    name?: true
    COMPCODE?: true
    active?: true
    defaultRole?: true
  }

  export type RoleCountAggregateInputType = {
    id?: true
    name?: true
    COMPCODE?: true
    active?: true
    defaultRole?: true
    _all?: true
  }

  export type RoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Role to aggregate.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Roles
    **/
    _count?: true | RoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoleMaxAggregateInputType
  }

  export type GetRoleAggregateType<T extends RoleAggregateArgs> = {
        [P in keyof T & keyof AggregateRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRole[P]>
      : GetScalarType<T[P], AggregateRole[P]>
  }




  export type RoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleWhereInput
    orderBy?: RoleOrderByWithAggregationInput | RoleOrderByWithAggregationInput[]
    by: RoleScalarFieldEnum[] | RoleScalarFieldEnum
    having?: RoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoleCountAggregateInputType | true
    _avg?: RoleAvgAggregateInputType
    _sum?: RoleSumAggregateInputType
    _min?: RoleMinAggregateInputType
    _max?: RoleMaxAggregateInputType
  }

  export type RoleGroupByOutputType = {
    id: number
    name: string
    COMPCODE: string
    active: string
    defaultRole: boolean
    _count: RoleCountAggregateOutputType | null
    _avg: RoleAvgAggregateOutputType | null
    _sum: RoleSumAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  type GetRoleGroupByPayload<T extends RoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoleGroupByOutputType[P]>
            : GetScalarType<T[P], RoleGroupByOutputType[P]>
        }
      >
    >


  export type RoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    COMPCODE?: boolean
    active?: boolean
    defaultRole?: boolean
    User?: boolean | Role$UserArgs<ExtArgs>
    RoleOnPage?: boolean | Role$RoleOnPageArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["role"]>



  export type RoleSelectScalar = {
    id?: boolean
    name?: boolean
    COMPCODE?: boolean
    active?: boolean
    defaultRole?: boolean
  }

  export type RoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "COMPCODE" | "active" | "defaultRole", ExtArgs["result"]["role"]>
  export type RoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | Role$UserArgs<ExtArgs>
    RoleOnPage?: boolean | Role$RoleOnPageArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $RolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Role"
    objects: {
      User: Prisma.$UserPayload<ExtArgs>[]
      RoleOnPage: Prisma.$RoleOnPagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      COMPCODE: string
      active: string
      defaultRole: boolean
    }, ExtArgs["result"]["role"]>
    composites: {}
  }

  type RoleGetPayload<S extends boolean | null | undefined | RoleDefaultArgs> = $Result.GetResult<Prisma.$RolePayload, S>

  type RoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoleCountAggregateInputType | true
    }

  export interface RoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Role'], meta: { name: 'Role' } }
    /**
     * Find zero or one Role that matches the filter.
     * @param {RoleFindUniqueArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoleFindUniqueArgs>(args: SelectSubset<T, RoleFindUniqueArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Role that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoleFindUniqueOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoleFindUniqueOrThrowArgs>(args: SelectSubset<T, RoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoleFindFirstArgs>(args?: SelectSubset<T, RoleFindFirstArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoleFindFirstOrThrowArgs>(args?: SelectSubset<T, RoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roles
     * const roles = await prisma.role.findMany()
     * 
     * // Get first 10 Roles
     * const roles = await prisma.role.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roleWithIdOnly = await prisma.role.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoleFindManyArgs>(args?: SelectSubset<T, RoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Role.
     * @param {RoleCreateArgs} args - Arguments to create a Role.
     * @example
     * // Create one Role
     * const Role = await prisma.role.create({
     *   data: {
     *     // ... data to create a Role
     *   }
     * })
     * 
     */
    create<T extends RoleCreateArgs>(args: SelectSubset<T, RoleCreateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Roles.
     * @param {RoleCreateManyArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoleCreateManyArgs>(args?: SelectSubset<T, RoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Role.
     * @param {RoleDeleteArgs} args - Arguments to delete one Role.
     * @example
     * // Delete one Role
     * const Role = await prisma.role.delete({
     *   where: {
     *     // ... filter to delete one Role
     *   }
     * })
     * 
     */
    delete<T extends RoleDeleteArgs>(args: SelectSubset<T, RoleDeleteArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Role.
     * @param {RoleUpdateArgs} args - Arguments to update one Role.
     * @example
     * // Update one Role
     * const role = await prisma.role.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoleUpdateArgs>(args: SelectSubset<T, RoleUpdateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Roles.
     * @param {RoleDeleteManyArgs} args - Arguments to filter Roles to delete.
     * @example
     * // Delete a few Roles
     * const { count } = await prisma.role.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoleDeleteManyArgs>(args?: SelectSubset<T, RoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoleUpdateManyArgs>(args: SelectSubset<T, RoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Role.
     * @param {RoleUpsertArgs} args - Arguments to update or create a Role.
     * @example
     * // Update or create a Role
     * const role = await prisma.role.upsert({
     *   create: {
     *     // ... data to create a Role
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Role we want to update
     *   }
     * })
     */
    upsert<T extends RoleUpsertArgs>(args: SelectSubset<T, RoleUpsertArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleCountArgs} args - Arguments to filter Roles to count.
     * @example
     * // Count the number of Roles
     * const count = await prisma.role.count({
     *   where: {
     *     // ... the filter for the Roles we want to count
     *   }
     * })
    **/
    count<T extends RoleCountArgs>(
      args?: Subset<T, RoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoleAggregateArgs>(args: Subset<T, RoleAggregateArgs>): Prisma.PrismaPromise<GetRoleAggregateType<T>>

    /**
     * Group by Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoleGroupByArgs['orderBy'] }
        : { orderBy?: RoleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Role model
   */
  readonly fields: RoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Role.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    User<T extends Role$UserArgs<ExtArgs> = {}>(args?: Subset<T, Role$UserArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    RoleOnPage<T extends Role$RoleOnPageArgs<ExtArgs> = {}>(args?: Subset<T, Role$RoleOnPageArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoleOnPagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Role model
   */
  interface RoleFieldRefs {
    readonly id: FieldRef<"Role", 'Int'>
    readonly name: FieldRef<"Role", 'String'>
    readonly COMPCODE: FieldRef<"Role", 'String'>
    readonly active: FieldRef<"Role", 'String'>
    readonly defaultRole: FieldRef<"Role", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Role findUnique
   */
  export type RoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findUniqueOrThrow
   */
  export type RoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findFirst
   */
  export type RoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findFirstOrThrow
   */
  export type RoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findMany
   */
  export type RoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role create
   */
  export type RoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to create a Role.
     */
    data: XOR<RoleCreateInput, RoleUncheckedCreateInput>
  }

  /**
   * Role createMany
   */
  export type RoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role update
   */
  export type RoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to update a Role.
     */
    data: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
    /**
     * Choose, which Role to update.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role updateMany
   */
  export type RoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role upsert
   */
  export type RoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The filter to search for the Role to update in case it exists.
     */
    where: RoleWhereUniqueInput
    /**
     * In case the Role found by the `where` argument doesn't exist, create a new Role with this data.
     */
    create: XOR<RoleCreateInput, RoleUncheckedCreateInput>
    /**
     * In case the Role was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
  }

  /**
   * Role delete
   */
  export type RoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter which Role to delete.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role deleteMany
   */
  export type RoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roles to delete
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to delete.
     */
    limit?: number
  }

  /**
   * Role.User
   */
  export type Role$UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Role.RoleOnPage
   */
  export type Role$RoleOnPageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleOnPage
     */
    select?: RoleOnPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleOnPage
     */
    omit?: RoleOnPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleOnPageInclude<ExtArgs> | null
    where?: RoleOnPageWhereInput
    orderBy?: RoleOnPageOrderByWithRelationInput | RoleOnPageOrderByWithRelationInput[]
    cursor?: RoleOnPageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoleOnPageScalarFieldEnum | RoleOnPageScalarFieldEnum[]
  }

  /**
   * Role without action
   */
  export type RoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
  }


  /**
   * Model RoleOnPage
   */

  export type AggregateRoleOnPage = {
    _count: RoleOnPageCountAggregateOutputType | null
    _avg: RoleOnPageAvgAggregateOutputType | null
    _sum: RoleOnPageSumAggregateOutputType | null
    _min: RoleOnPageMinAggregateOutputType | null
    _max: RoleOnPageMaxAggregateOutputType | null
  }

  export type RoleOnPageAvgAggregateOutputType = {
    id: number | null
    roleId: number | null
  }

  export type RoleOnPageSumAggregateOutputType = {
    id: number | null
    roleId: number | null
  }

  export type RoleOnPageMinAggregateOutputType = {
    id: number | null
    roleId: number | null
    roleName: string | null
    read: boolean | null
    create: boolean | null
    edit: boolean | null
    link: string | null
    delete: boolean | null
    isdefault: boolean | null
  }

  export type RoleOnPageMaxAggregateOutputType = {
    id: number | null
    roleId: number | null
    roleName: string | null
    read: boolean | null
    create: boolean | null
    edit: boolean | null
    link: string | null
    delete: boolean | null
    isdefault: boolean | null
  }

  export type RoleOnPageCountAggregateOutputType = {
    id: number
    roleId: number
    roleName: number
    read: number
    create: number
    edit: number
    link: number
    delete: number
    isdefault: number
    _all: number
  }


  export type RoleOnPageAvgAggregateInputType = {
    id?: true
    roleId?: true
  }

  export type RoleOnPageSumAggregateInputType = {
    id?: true
    roleId?: true
  }

  export type RoleOnPageMinAggregateInputType = {
    id?: true
    roleId?: true
    roleName?: true
    read?: true
    create?: true
    edit?: true
    link?: true
    delete?: true
    isdefault?: true
  }

  export type RoleOnPageMaxAggregateInputType = {
    id?: true
    roleId?: true
    roleName?: true
    read?: true
    create?: true
    edit?: true
    link?: true
    delete?: true
    isdefault?: true
  }

  export type RoleOnPageCountAggregateInputType = {
    id?: true
    roleId?: true
    roleName?: true
    read?: true
    create?: true
    edit?: true
    link?: true
    delete?: true
    isdefault?: true
    _all?: true
  }

  export type RoleOnPageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoleOnPage to aggregate.
     */
    where?: RoleOnPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoleOnPages to fetch.
     */
    orderBy?: RoleOnPageOrderByWithRelationInput | RoleOnPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoleOnPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoleOnPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoleOnPages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoleOnPages
    **/
    _count?: true | RoleOnPageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoleOnPageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoleOnPageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoleOnPageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoleOnPageMaxAggregateInputType
  }

  export type GetRoleOnPageAggregateType<T extends RoleOnPageAggregateArgs> = {
        [P in keyof T & keyof AggregateRoleOnPage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoleOnPage[P]>
      : GetScalarType<T[P], AggregateRoleOnPage[P]>
  }




  export type RoleOnPageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleOnPageWhereInput
    orderBy?: RoleOnPageOrderByWithAggregationInput | RoleOnPageOrderByWithAggregationInput[]
    by: RoleOnPageScalarFieldEnum[] | RoleOnPageScalarFieldEnum
    having?: RoleOnPageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoleOnPageCountAggregateInputType | true
    _avg?: RoleOnPageAvgAggregateInputType
    _sum?: RoleOnPageSumAggregateInputType
    _min?: RoleOnPageMinAggregateInputType
    _max?: RoleOnPageMaxAggregateInputType
  }

  export type RoleOnPageGroupByOutputType = {
    id: number
    roleId: number | null
    roleName: string
    read: boolean
    create: boolean
    edit: boolean
    link: string
    delete: boolean
    isdefault: boolean
    _count: RoleOnPageCountAggregateOutputType | null
    _avg: RoleOnPageAvgAggregateOutputType | null
    _sum: RoleOnPageSumAggregateOutputType | null
    _min: RoleOnPageMinAggregateOutputType | null
    _max: RoleOnPageMaxAggregateOutputType | null
  }

  type GetRoleOnPageGroupByPayload<T extends RoleOnPageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoleOnPageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoleOnPageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoleOnPageGroupByOutputType[P]>
            : GetScalarType<T[P], RoleOnPageGroupByOutputType[P]>
        }
      >
    >


  export type RoleOnPageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roleId?: boolean
    roleName?: boolean
    read?: boolean
    create?: boolean
    edit?: boolean
    link?: boolean
    delete?: boolean
    isdefault?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roleOnPage"]>



  export type RoleOnPageSelectScalar = {
    id?: boolean
    roleId?: boolean
    roleName?: boolean
    read?: boolean
    create?: boolean
    edit?: boolean
    link?: boolean
    delete?: boolean
    isdefault?: boolean
  }

  export type RoleOnPageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "roleId" | "roleName" | "read" | "create" | "edit" | "link" | "delete" | "isdefault", ExtArgs["result"]["roleOnPage"]>
  export type RoleOnPageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }

  export type $RoleOnPagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoleOnPage"
    objects: {
      role: Prisma.$RolePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      roleId: number | null
      roleName: string
      read: boolean
      create: boolean
      edit: boolean
      link: string
      delete: boolean
      isdefault: boolean
    }, ExtArgs["result"]["roleOnPage"]>
    composites: {}
  }

  type RoleOnPageGetPayload<S extends boolean | null | undefined | RoleOnPageDefaultArgs> = $Result.GetResult<Prisma.$RoleOnPagePayload, S>

  type RoleOnPageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoleOnPageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoleOnPageCountAggregateInputType | true
    }

  export interface RoleOnPageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoleOnPage'], meta: { name: 'RoleOnPage' } }
    /**
     * Find zero or one RoleOnPage that matches the filter.
     * @param {RoleOnPageFindUniqueArgs} args - Arguments to find a RoleOnPage
     * @example
     * // Get one RoleOnPage
     * const roleOnPage = await prisma.roleOnPage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoleOnPageFindUniqueArgs>(args: SelectSubset<T, RoleOnPageFindUniqueArgs<ExtArgs>>): Prisma__RoleOnPageClient<$Result.GetResult<Prisma.$RoleOnPagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoleOnPage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoleOnPageFindUniqueOrThrowArgs} args - Arguments to find a RoleOnPage
     * @example
     * // Get one RoleOnPage
     * const roleOnPage = await prisma.roleOnPage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoleOnPageFindUniqueOrThrowArgs>(args: SelectSubset<T, RoleOnPageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoleOnPageClient<$Result.GetResult<Prisma.$RoleOnPagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoleOnPage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleOnPageFindFirstArgs} args - Arguments to find a RoleOnPage
     * @example
     * // Get one RoleOnPage
     * const roleOnPage = await prisma.roleOnPage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoleOnPageFindFirstArgs>(args?: SelectSubset<T, RoleOnPageFindFirstArgs<ExtArgs>>): Prisma__RoleOnPageClient<$Result.GetResult<Prisma.$RoleOnPagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoleOnPage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleOnPageFindFirstOrThrowArgs} args - Arguments to find a RoleOnPage
     * @example
     * // Get one RoleOnPage
     * const roleOnPage = await prisma.roleOnPage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoleOnPageFindFirstOrThrowArgs>(args?: SelectSubset<T, RoleOnPageFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoleOnPageClient<$Result.GetResult<Prisma.$RoleOnPagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoleOnPages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleOnPageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoleOnPages
     * const roleOnPages = await prisma.roleOnPage.findMany()
     * 
     * // Get first 10 RoleOnPages
     * const roleOnPages = await prisma.roleOnPage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roleOnPageWithIdOnly = await prisma.roleOnPage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoleOnPageFindManyArgs>(args?: SelectSubset<T, RoleOnPageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoleOnPagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoleOnPage.
     * @param {RoleOnPageCreateArgs} args - Arguments to create a RoleOnPage.
     * @example
     * // Create one RoleOnPage
     * const RoleOnPage = await prisma.roleOnPage.create({
     *   data: {
     *     // ... data to create a RoleOnPage
     *   }
     * })
     * 
     */
    create<T extends RoleOnPageCreateArgs>(args: SelectSubset<T, RoleOnPageCreateArgs<ExtArgs>>): Prisma__RoleOnPageClient<$Result.GetResult<Prisma.$RoleOnPagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoleOnPages.
     * @param {RoleOnPageCreateManyArgs} args - Arguments to create many RoleOnPages.
     * @example
     * // Create many RoleOnPages
     * const roleOnPage = await prisma.roleOnPage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoleOnPageCreateManyArgs>(args?: SelectSubset<T, RoleOnPageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a RoleOnPage.
     * @param {RoleOnPageDeleteArgs} args - Arguments to delete one RoleOnPage.
     * @example
     * // Delete one RoleOnPage
     * const RoleOnPage = await prisma.roleOnPage.delete({
     *   where: {
     *     // ... filter to delete one RoleOnPage
     *   }
     * })
     * 
     */
    delete<T extends RoleOnPageDeleteArgs>(args: SelectSubset<T, RoleOnPageDeleteArgs<ExtArgs>>): Prisma__RoleOnPageClient<$Result.GetResult<Prisma.$RoleOnPagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoleOnPage.
     * @param {RoleOnPageUpdateArgs} args - Arguments to update one RoleOnPage.
     * @example
     * // Update one RoleOnPage
     * const roleOnPage = await prisma.roleOnPage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoleOnPageUpdateArgs>(args: SelectSubset<T, RoleOnPageUpdateArgs<ExtArgs>>): Prisma__RoleOnPageClient<$Result.GetResult<Prisma.$RoleOnPagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoleOnPages.
     * @param {RoleOnPageDeleteManyArgs} args - Arguments to filter RoleOnPages to delete.
     * @example
     * // Delete a few RoleOnPages
     * const { count } = await prisma.roleOnPage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoleOnPageDeleteManyArgs>(args?: SelectSubset<T, RoleOnPageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoleOnPages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleOnPageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoleOnPages
     * const roleOnPage = await prisma.roleOnPage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoleOnPageUpdateManyArgs>(args: SelectSubset<T, RoleOnPageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RoleOnPage.
     * @param {RoleOnPageUpsertArgs} args - Arguments to update or create a RoleOnPage.
     * @example
     * // Update or create a RoleOnPage
     * const roleOnPage = await prisma.roleOnPage.upsert({
     *   create: {
     *     // ... data to create a RoleOnPage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoleOnPage we want to update
     *   }
     * })
     */
    upsert<T extends RoleOnPageUpsertArgs>(args: SelectSubset<T, RoleOnPageUpsertArgs<ExtArgs>>): Prisma__RoleOnPageClient<$Result.GetResult<Prisma.$RoleOnPagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoleOnPages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleOnPageCountArgs} args - Arguments to filter RoleOnPages to count.
     * @example
     * // Count the number of RoleOnPages
     * const count = await prisma.roleOnPage.count({
     *   where: {
     *     // ... the filter for the RoleOnPages we want to count
     *   }
     * })
    **/
    count<T extends RoleOnPageCountArgs>(
      args?: Subset<T, RoleOnPageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoleOnPageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoleOnPage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleOnPageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoleOnPageAggregateArgs>(args: Subset<T, RoleOnPageAggregateArgs>): Prisma.PrismaPromise<GetRoleOnPageAggregateType<T>>

    /**
     * Group by RoleOnPage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleOnPageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoleOnPageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoleOnPageGroupByArgs['orderBy'] }
        : { orderBy?: RoleOnPageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoleOnPageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoleOnPageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoleOnPage model
   */
  readonly fields: RoleOnPageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoleOnPage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoleOnPageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    role<T extends RoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoleDefaultArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RoleOnPage model
   */
  interface RoleOnPageFieldRefs {
    readonly id: FieldRef<"RoleOnPage", 'Int'>
    readonly roleId: FieldRef<"RoleOnPage", 'Int'>
    readonly roleName: FieldRef<"RoleOnPage", 'String'>
    readonly read: FieldRef<"RoleOnPage", 'Boolean'>
    readonly create: FieldRef<"RoleOnPage", 'Boolean'>
    readonly edit: FieldRef<"RoleOnPage", 'Boolean'>
    readonly link: FieldRef<"RoleOnPage", 'String'>
    readonly delete: FieldRef<"RoleOnPage", 'Boolean'>
    readonly isdefault: FieldRef<"RoleOnPage", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * RoleOnPage findUnique
   */
  export type RoleOnPageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleOnPage
     */
    select?: RoleOnPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleOnPage
     */
    omit?: RoleOnPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleOnPageInclude<ExtArgs> | null
    /**
     * Filter, which RoleOnPage to fetch.
     */
    where: RoleOnPageWhereUniqueInput
  }

  /**
   * RoleOnPage findUniqueOrThrow
   */
  export type RoleOnPageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleOnPage
     */
    select?: RoleOnPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleOnPage
     */
    omit?: RoleOnPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleOnPageInclude<ExtArgs> | null
    /**
     * Filter, which RoleOnPage to fetch.
     */
    where: RoleOnPageWhereUniqueInput
  }

  /**
   * RoleOnPage findFirst
   */
  export type RoleOnPageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleOnPage
     */
    select?: RoleOnPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleOnPage
     */
    omit?: RoleOnPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleOnPageInclude<ExtArgs> | null
    /**
     * Filter, which RoleOnPage to fetch.
     */
    where?: RoleOnPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoleOnPages to fetch.
     */
    orderBy?: RoleOnPageOrderByWithRelationInput | RoleOnPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoleOnPages.
     */
    cursor?: RoleOnPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoleOnPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoleOnPages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoleOnPages.
     */
    distinct?: RoleOnPageScalarFieldEnum | RoleOnPageScalarFieldEnum[]
  }

  /**
   * RoleOnPage findFirstOrThrow
   */
  export type RoleOnPageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleOnPage
     */
    select?: RoleOnPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleOnPage
     */
    omit?: RoleOnPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleOnPageInclude<ExtArgs> | null
    /**
     * Filter, which RoleOnPage to fetch.
     */
    where?: RoleOnPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoleOnPages to fetch.
     */
    orderBy?: RoleOnPageOrderByWithRelationInput | RoleOnPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoleOnPages.
     */
    cursor?: RoleOnPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoleOnPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoleOnPages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoleOnPages.
     */
    distinct?: RoleOnPageScalarFieldEnum | RoleOnPageScalarFieldEnum[]
  }

  /**
   * RoleOnPage findMany
   */
  export type RoleOnPageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleOnPage
     */
    select?: RoleOnPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleOnPage
     */
    omit?: RoleOnPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleOnPageInclude<ExtArgs> | null
    /**
     * Filter, which RoleOnPages to fetch.
     */
    where?: RoleOnPageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoleOnPages to fetch.
     */
    orderBy?: RoleOnPageOrderByWithRelationInput | RoleOnPageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoleOnPages.
     */
    cursor?: RoleOnPageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoleOnPages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoleOnPages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoleOnPages.
     */
    distinct?: RoleOnPageScalarFieldEnum | RoleOnPageScalarFieldEnum[]
  }

  /**
   * RoleOnPage create
   */
  export type RoleOnPageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleOnPage
     */
    select?: RoleOnPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleOnPage
     */
    omit?: RoleOnPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleOnPageInclude<ExtArgs> | null
    /**
     * The data needed to create a RoleOnPage.
     */
    data: XOR<RoleOnPageCreateInput, RoleOnPageUncheckedCreateInput>
  }

  /**
   * RoleOnPage createMany
   */
  export type RoleOnPageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoleOnPages.
     */
    data: RoleOnPageCreateManyInput | RoleOnPageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoleOnPage update
   */
  export type RoleOnPageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleOnPage
     */
    select?: RoleOnPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleOnPage
     */
    omit?: RoleOnPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleOnPageInclude<ExtArgs> | null
    /**
     * The data needed to update a RoleOnPage.
     */
    data: XOR<RoleOnPageUpdateInput, RoleOnPageUncheckedUpdateInput>
    /**
     * Choose, which RoleOnPage to update.
     */
    where: RoleOnPageWhereUniqueInput
  }

  /**
   * RoleOnPage updateMany
   */
  export type RoleOnPageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoleOnPages.
     */
    data: XOR<RoleOnPageUpdateManyMutationInput, RoleOnPageUncheckedUpdateManyInput>
    /**
     * Filter which RoleOnPages to update
     */
    where?: RoleOnPageWhereInput
    /**
     * Limit how many RoleOnPages to update.
     */
    limit?: number
  }

  /**
   * RoleOnPage upsert
   */
  export type RoleOnPageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleOnPage
     */
    select?: RoleOnPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleOnPage
     */
    omit?: RoleOnPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleOnPageInclude<ExtArgs> | null
    /**
     * The filter to search for the RoleOnPage to update in case it exists.
     */
    where: RoleOnPageWhereUniqueInput
    /**
     * In case the RoleOnPage found by the `where` argument doesn't exist, create a new RoleOnPage with this data.
     */
    create: XOR<RoleOnPageCreateInput, RoleOnPageUncheckedCreateInput>
    /**
     * In case the RoleOnPage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoleOnPageUpdateInput, RoleOnPageUncheckedUpdateInput>
  }

  /**
   * RoleOnPage delete
   */
  export type RoleOnPageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleOnPage
     */
    select?: RoleOnPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleOnPage
     */
    omit?: RoleOnPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleOnPageInclude<ExtArgs> | null
    /**
     * Filter which RoleOnPage to delete.
     */
    where: RoleOnPageWhereUniqueInput
  }

  /**
   * RoleOnPage deleteMany
   */
  export type RoleOnPageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoleOnPages to delete
     */
    where?: RoleOnPageWhereInput
    /**
     * Limit how many RoleOnPages to delete.
     */
    limit?: number
  }

  /**
   * RoleOnPage without action
   */
  export type RoleOnPageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleOnPage
     */
    select?: RoleOnPageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleOnPage
     */
    omit?: RoleOnPageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleOnPageInclude<ExtArgs> | null
  }


  /**
   * Model UserLog
   */

  export type AggregateUserLog = {
    _count: UserLogCountAggregateOutputType | null
    _avg: UserLogAvgAggregateOutputType | null
    _sum: UserLogSumAggregateOutputType | null
    _min: UserLogMinAggregateOutputType | null
    _max: UserLogMaxAggregateOutputType | null
  }

  export type UserLogAvgAggregateOutputType = {
    id: number | null
  }

  export type UserLogSumAggregateOutputType = {
    id: number | null
  }

  export type UserLogMinAggregateOutputType = {
    id: number | null
    User: string | null
    MobileName: string | null
    date: Date | null
    MobileIP: string | null
    type: string | null
    Idcard: string | null
    COMPCODE: string | null
  }

  export type UserLogMaxAggregateOutputType = {
    id: number | null
    User: string | null
    MobileName: string | null
    date: Date | null
    MobileIP: string | null
    type: string | null
    Idcard: string | null
    COMPCODE: string | null
  }

  export type UserLogCountAggregateOutputType = {
    id: number
    User: number
    MobileName: number
    date: number
    MobileIP: number
    type: number
    Idcard: number
    COMPCODE: number
    _all: number
  }


  export type UserLogAvgAggregateInputType = {
    id?: true
  }

  export type UserLogSumAggregateInputType = {
    id?: true
  }

  export type UserLogMinAggregateInputType = {
    id?: true
    User?: true
    MobileName?: true
    date?: true
    MobileIP?: true
    type?: true
    Idcard?: true
    COMPCODE?: true
  }

  export type UserLogMaxAggregateInputType = {
    id?: true
    User?: true
    MobileName?: true
    date?: true
    MobileIP?: true
    type?: true
    Idcard?: true
    COMPCODE?: true
  }

  export type UserLogCountAggregateInputType = {
    id?: true
    User?: true
    MobileName?: true
    date?: true
    MobileIP?: true
    type?: true
    Idcard?: true
    COMPCODE?: true
    _all?: true
  }

  export type UserLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserLog to aggregate.
     */
    where?: UserLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLogs to fetch.
     */
    orderBy?: UserLogOrderByWithRelationInput | UserLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserLogs
    **/
    _count?: true | UserLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserLogMaxAggregateInputType
  }

  export type GetUserLogAggregateType<T extends UserLogAggregateArgs> = {
        [P in keyof T & keyof AggregateUserLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserLog[P]>
      : GetScalarType<T[P], AggregateUserLog[P]>
  }




  export type UserLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserLogWhereInput
    orderBy?: UserLogOrderByWithAggregationInput | UserLogOrderByWithAggregationInput[]
    by: UserLogScalarFieldEnum[] | UserLogScalarFieldEnum
    having?: UserLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserLogCountAggregateInputType | true
    _avg?: UserLogAvgAggregateInputType
    _sum?: UserLogSumAggregateInputType
    _min?: UserLogMinAggregateInputType
    _max?: UserLogMaxAggregateInputType
  }

  export type UserLogGroupByOutputType = {
    id: number
    User: string | null
    MobileName: string | null
    date: Date
    MobileIP: string | null
    type: string
    Idcard: string | null
    COMPCODE: string | null
    _count: UserLogCountAggregateOutputType | null
    _avg: UserLogAvgAggregateOutputType | null
    _sum: UserLogSumAggregateOutputType | null
    _min: UserLogMinAggregateOutputType | null
    _max: UserLogMaxAggregateOutputType | null
  }

  type GetUserLogGroupByPayload<T extends UserLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserLogGroupByOutputType[P]>
            : GetScalarType<T[P], UserLogGroupByOutputType[P]>
        }
      >
    >


  export type UserLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    User?: boolean
    MobileName?: boolean
    date?: boolean
    MobileIP?: boolean
    type?: boolean
    Idcard?: boolean
    COMPCODE?: boolean
  }, ExtArgs["result"]["userLog"]>



  export type UserLogSelectScalar = {
    id?: boolean
    User?: boolean
    MobileName?: boolean
    date?: boolean
    MobileIP?: boolean
    type?: boolean
    Idcard?: boolean
    COMPCODE?: boolean
  }

  export type UserLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "User" | "MobileName" | "date" | "MobileIP" | "type" | "Idcard" | "COMPCODE", ExtArgs["result"]["userLog"]>

  export type $UserLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      User: string | null
      MobileName: string | null
      date: Date
      MobileIP: string | null
      type: string
      Idcard: string | null
      COMPCODE: string | null
    }, ExtArgs["result"]["userLog"]>
    composites: {}
  }

  type UserLogGetPayload<S extends boolean | null | undefined | UserLogDefaultArgs> = $Result.GetResult<Prisma.$UserLogPayload, S>

  type UserLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserLogCountAggregateInputType | true
    }

  export interface UserLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserLog'], meta: { name: 'UserLog' } }
    /**
     * Find zero or one UserLog that matches the filter.
     * @param {UserLogFindUniqueArgs} args - Arguments to find a UserLog
     * @example
     * // Get one UserLog
     * const userLog = await prisma.userLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserLogFindUniqueArgs>(args: SelectSubset<T, UserLogFindUniqueArgs<ExtArgs>>): Prisma__UserLogClient<$Result.GetResult<Prisma.$UserLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserLogFindUniqueOrThrowArgs} args - Arguments to find a UserLog
     * @example
     * // Get one UserLog
     * const userLog = await prisma.userLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserLogFindUniqueOrThrowArgs>(args: SelectSubset<T, UserLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserLogClient<$Result.GetResult<Prisma.$UserLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLogFindFirstArgs} args - Arguments to find a UserLog
     * @example
     * // Get one UserLog
     * const userLog = await prisma.userLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserLogFindFirstArgs>(args?: SelectSubset<T, UserLogFindFirstArgs<ExtArgs>>): Prisma__UserLogClient<$Result.GetResult<Prisma.$UserLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLogFindFirstOrThrowArgs} args - Arguments to find a UserLog
     * @example
     * // Get one UserLog
     * const userLog = await prisma.userLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserLogFindFirstOrThrowArgs>(args?: SelectSubset<T, UserLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserLogClient<$Result.GetResult<Prisma.$UserLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserLogs
     * const userLogs = await prisma.userLog.findMany()
     * 
     * // Get first 10 UserLogs
     * const userLogs = await prisma.userLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userLogWithIdOnly = await prisma.userLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserLogFindManyArgs>(args?: SelectSubset<T, UserLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserLog.
     * @param {UserLogCreateArgs} args - Arguments to create a UserLog.
     * @example
     * // Create one UserLog
     * const UserLog = await prisma.userLog.create({
     *   data: {
     *     // ... data to create a UserLog
     *   }
     * })
     * 
     */
    create<T extends UserLogCreateArgs>(args: SelectSubset<T, UserLogCreateArgs<ExtArgs>>): Prisma__UserLogClient<$Result.GetResult<Prisma.$UserLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserLogs.
     * @param {UserLogCreateManyArgs} args - Arguments to create many UserLogs.
     * @example
     * // Create many UserLogs
     * const userLog = await prisma.userLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserLogCreateManyArgs>(args?: SelectSubset<T, UserLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserLog.
     * @param {UserLogDeleteArgs} args - Arguments to delete one UserLog.
     * @example
     * // Delete one UserLog
     * const UserLog = await prisma.userLog.delete({
     *   where: {
     *     // ... filter to delete one UserLog
     *   }
     * })
     * 
     */
    delete<T extends UserLogDeleteArgs>(args: SelectSubset<T, UserLogDeleteArgs<ExtArgs>>): Prisma__UserLogClient<$Result.GetResult<Prisma.$UserLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserLog.
     * @param {UserLogUpdateArgs} args - Arguments to update one UserLog.
     * @example
     * // Update one UserLog
     * const userLog = await prisma.userLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserLogUpdateArgs>(args: SelectSubset<T, UserLogUpdateArgs<ExtArgs>>): Prisma__UserLogClient<$Result.GetResult<Prisma.$UserLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserLogs.
     * @param {UserLogDeleteManyArgs} args - Arguments to filter UserLogs to delete.
     * @example
     * // Delete a few UserLogs
     * const { count } = await prisma.userLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserLogDeleteManyArgs>(args?: SelectSubset<T, UserLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserLogs
     * const userLog = await prisma.userLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserLogUpdateManyArgs>(args: SelectSubset<T, UserLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserLog.
     * @param {UserLogUpsertArgs} args - Arguments to update or create a UserLog.
     * @example
     * // Update or create a UserLog
     * const userLog = await prisma.userLog.upsert({
     *   create: {
     *     // ... data to create a UserLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserLog we want to update
     *   }
     * })
     */
    upsert<T extends UserLogUpsertArgs>(args: SelectSubset<T, UserLogUpsertArgs<ExtArgs>>): Prisma__UserLogClient<$Result.GetResult<Prisma.$UserLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLogCountArgs} args - Arguments to filter UserLogs to count.
     * @example
     * // Count the number of UserLogs
     * const count = await prisma.userLog.count({
     *   where: {
     *     // ... the filter for the UserLogs we want to count
     *   }
     * })
    **/
    count<T extends UserLogCountArgs>(
      args?: Subset<T, UserLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserLogAggregateArgs>(args: Subset<T, UserLogAggregateArgs>): Prisma.PrismaPromise<GetUserLogAggregateType<T>>

    /**
     * Group by UserLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserLogGroupByArgs['orderBy'] }
        : { orderBy?: UserLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserLog model
   */
  readonly fields: UserLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserLog model
   */
  interface UserLogFieldRefs {
    readonly id: FieldRef<"UserLog", 'Int'>
    readonly User: FieldRef<"UserLog", 'String'>
    readonly MobileName: FieldRef<"UserLog", 'String'>
    readonly date: FieldRef<"UserLog", 'DateTime'>
    readonly MobileIP: FieldRef<"UserLog", 'String'>
    readonly type: FieldRef<"UserLog", 'String'>
    readonly Idcard: FieldRef<"UserLog", 'String'>
    readonly COMPCODE: FieldRef<"UserLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserLog findUnique
   */
  export type UserLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLog
     */
    select?: UserLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLog
     */
    omit?: UserLogOmit<ExtArgs> | null
    /**
     * Filter, which UserLog to fetch.
     */
    where: UserLogWhereUniqueInput
  }

  /**
   * UserLog findUniqueOrThrow
   */
  export type UserLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLog
     */
    select?: UserLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLog
     */
    omit?: UserLogOmit<ExtArgs> | null
    /**
     * Filter, which UserLog to fetch.
     */
    where: UserLogWhereUniqueInput
  }

  /**
   * UserLog findFirst
   */
  export type UserLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLog
     */
    select?: UserLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLog
     */
    omit?: UserLogOmit<ExtArgs> | null
    /**
     * Filter, which UserLog to fetch.
     */
    where?: UserLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLogs to fetch.
     */
    orderBy?: UserLogOrderByWithRelationInput | UserLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserLogs.
     */
    cursor?: UserLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserLogs.
     */
    distinct?: UserLogScalarFieldEnum | UserLogScalarFieldEnum[]
  }

  /**
   * UserLog findFirstOrThrow
   */
  export type UserLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLog
     */
    select?: UserLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLog
     */
    omit?: UserLogOmit<ExtArgs> | null
    /**
     * Filter, which UserLog to fetch.
     */
    where?: UserLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLogs to fetch.
     */
    orderBy?: UserLogOrderByWithRelationInput | UserLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserLogs.
     */
    cursor?: UserLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserLogs.
     */
    distinct?: UserLogScalarFieldEnum | UserLogScalarFieldEnum[]
  }

  /**
   * UserLog findMany
   */
  export type UserLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLog
     */
    select?: UserLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLog
     */
    omit?: UserLogOmit<ExtArgs> | null
    /**
     * Filter, which UserLogs to fetch.
     */
    where?: UserLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLogs to fetch.
     */
    orderBy?: UserLogOrderByWithRelationInput | UserLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserLogs.
     */
    cursor?: UserLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserLogs.
     */
    distinct?: UserLogScalarFieldEnum | UserLogScalarFieldEnum[]
  }

  /**
   * UserLog create
   */
  export type UserLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLog
     */
    select?: UserLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLog
     */
    omit?: UserLogOmit<ExtArgs> | null
    /**
     * The data needed to create a UserLog.
     */
    data: XOR<UserLogCreateInput, UserLogUncheckedCreateInput>
  }

  /**
   * UserLog createMany
   */
  export type UserLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserLogs.
     */
    data: UserLogCreateManyInput | UserLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserLog update
   */
  export type UserLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLog
     */
    select?: UserLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLog
     */
    omit?: UserLogOmit<ExtArgs> | null
    /**
     * The data needed to update a UserLog.
     */
    data: XOR<UserLogUpdateInput, UserLogUncheckedUpdateInput>
    /**
     * Choose, which UserLog to update.
     */
    where: UserLogWhereUniqueInput
  }

  /**
   * UserLog updateMany
   */
  export type UserLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserLogs.
     */
    data: XOR<UserLogUpdateManyMutationInput, UserLogUncheckedUpdateManyInput>
    /**
     * Filter which UserLogs to update
     */
    where?: UserLogWhereInput
    /**
     * Limit how many UserLogs to update.
     */
    limit?: number
  }

  /**
   * UserLog upsert
   */
  export type UserLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLog
     */
    select?: UserLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLog
     */
    omit?: UserLogOmit<ExtArgs> | null
    /**
     * The filter to search for the UserLog to update in case it exists.
     */
    where: UserLogWhereUniqueInput
    /**
     * In case the UserLog found by the `where` argument doesn't exist, create a new UserLog with this data.
     */
    create: XOR<UserLogCreateInput, UserLogUncheckedCreateInput>
    /**
     * In case the UserLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserLogUpdateInput, UserLogUncheckedUpdateInput>
  }

  /**
   * UserLog delete
   */
  export type UserLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLog
     */
    select?: UserLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLog
     */
    omit?: UserLogOmit<ExtArgs> | null
    /**
     * Filter which UserLog to delete.
     */
    where: UserLogWhereUniqueInput
  }

  /**
   * UserLog deleteMany
   */
  export type UserLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserLogs to delete
     */
    where?: UserLogWhereInput
    /**
     * Limit how many UserLogs to delete.
     */
    limit?: number
  }

  /**
   * UserLog without action
   */
  export type UserLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLog
     */
    select?: UserLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLog
     */
    omit?: UserLogOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SettingsScalarFieldEnum: {
    SettingId: 'SettingId',
    UserId: 'UserId',
    Notification: 'Notification',
    BioMatrics: 'BioMatrics',
    COMPCODE: 'COMPCODE'
  };

  export type SettingsScalarFieldEnum = (typeof SettingsScalarFieldEnum)[keyof typeof SettingsScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    pic: 'pic',
    email: 'email',
    otpemail: 'otpemail',
    approval: 'approval',
    password: 'password',
    Idcard: 'Idcard',
    roleId: 'roleId',
    otp: 'otp',
    hod: 'hod',
    hr: 'hr',
    level: 'level',
    verificationOtp: 'verificationOtp',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    active: 'active',
    employeeId: 'employeeId',
    isAllParty: 'isAllParty',
    isAdmin: 'isAdmin',
    fcm: 'fcm'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CompanyCodeScalarFieldEnum: {
    id: 'id',
    Idcard: 'Idcard',
    companyCode: 'companyCode',
    GCOMP: 'GCOMP',
    companyid: 'companyid'
  };

  export type CompanyCodeScalarFieldEnum = (typeof CompanyCodeScalarFieldEnum)[keyof typeof CompanyCodeScalarFieldEnum]


  export const RoleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    COMPCODE: 'COMPCODE',
    active: 'active',
    defaultRole: 'defaultRole'
  };

  export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum]


  export const RoleOnPageScalarFieldEnum: {
    id: 'id',
    roleId: 'roleId',
    roleName: 'roleName',
    read: 'read',
    create: 'create',
    edit: 'edit',
    link: 'link',
    delete: 'delete',
    isdefault: 'isdefault'
  };

  export type RoleOnPageScalarFieldEnum = (typeof RoleOnPageScalarFieldEnum)[keyof typeof RoleOnPageScalarFieldEnum]


  export const UserLogScalarFieldEnum: {
    id: 'id',
    User: 'User',
    MobileName: 'MobileName',
    date: 'date',
    MobileIP: 'MobileIP',
    type: 'type',
    Idcard: 'Idcard',
    COMPCODE: 'COMPCODE'
  };

  export type UserLogScalarFieldEnum = (typeof UserLogScalarFieldEnum)[keyof typeof UserLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const settingsOrderByRelevanceFieldEnum: {
    UserId: 'UserId',
    COMPCODE: 'COMPCODE'
  };

  export type settingsOrderByRelevanceFieldEnum = (typeof settingsOrderByRelevanceFieldEnum)[keyof typeof settingsOrderByRelevanceFieldEnum]


  export const UserOrderByRelevanceFieldEnum: {
    username: 'username',
    pic: 'pic',
    email: 'email',
    otpemail: 'otpemail',
    approval: 'approval',
    password: 'password',
    Idcard: 'Idcard',
    roleId: 'roleId',
    otp: 'otp',
    hod: 'hod',
    hr: 'hr',
    level: 'level',
    verificationOtp: 'verificationOtp',
    fcm: 'fcm'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const CompanyCodeOrderByRelevanceFieldEnum: {
    Idcard: 'Idcard',
    companyCode: 'companyCode',
    GCOMP: 'GCOMP',
    companyid: 'companyid'
  };

  export type CompanyCodeOrderByRelevanceFieldEnum = (typeof CompanyCodeOrderByRelevanceFieldEnum)[keyof typeof CompanyCodeOrderByRelevanceFieldEnum]


  export const RoleOrderByRelevanceFieldEnum: {
    name: 'name',
    COMPCODE: 'COMPCODE',
    active: 'active'
  };

  export type RoleOrderByRelevanceFieldEnum = (typeof RoleOrderByRelevanceFieldEnum)[keyof typeof RoleOrderByRelevanceFieldEnum]


  export const RoleOnPageOrderByRelevanceFieldEnum: {
    roleName: 'roleName',
    link: 'link'
  };

  export type RoleOnPageOrderByRelevanceFieldEnum = (typeof RoleOnPageOrderByRelevanceFieldEnum)[keyof typeof RoleOnPageOrderByRelevanceFieldEnum]


  export const UserLogOrderByRelevanceFieldEnum: {
    User: 'User',
    MobileName: 'MobileName',
    MobileIP: 'MobileIP',
    type: 'type',
    Idcard: 'Idcard',
    COMPCODE: 'COMPCODE'
  };

  export type UserLogOrderByRelevanceFieldEnum = (typeof UserLogOrderByRelevanceFieldEnum)[keyof typeof UserLogOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type settingsWhereInput = {
    AND?: settingsWhereInput | settingsWhereInput[]
    OR?: settingsWhereInput[]
    NOT?: settingsWhereInput | settingsWhereInput[]
    SettingId?: IntFilter<"settings"> | number
    UserId?: StringFilter<"settings"> | string
    Notification?: BoolNullableFilter<"settings"> | boolean | null
    BioMatrics?: BoolNullableFilter<"settings"> | boolean | null
    COMPCODE?: StringNullableFilter<"settings"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type settingsOrderByWithRelationInput = {
    SettingId?: SortOrder
    UserId?: SortOrder
    Notification?: SortOrderInput | SortOrder
    BioMatrics?: SortOrderInput | SortOrder
    COMPCODE?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: settingsOrderByRelevanceInput
  }

  export type settingsWhereUniqueInput = Prisma.AtLeast<{
    SettingId?: number
    UserId?: string
    AND?: settingsWhereInput | settingsWhereInput[]
    OR?: settingsWhereInput[]
    NOT?: settingsWhereInput | settingsWhereInput[]
    Notification?: BoolNullableFilter<"settings"> | boolean | null
    BioMatrics?: BoolNullableFilter<"settings"> | boolean | null
    COMPCODE?: StringNullableFilter<"settings"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "SettingId" | "UserId">

  export type settingsOrderByWithAggregationInput = {
    SettingId?: SortOrder
    UserId?: SortOrder
    Notification?: SortOrderInput | SortOrder
    BioMatrics?: SortOrderInput | SortOrder
    COMPCODE?: SortOrderInput | SortOrder
    _count?: settingsCountOrderByAggregateInput
    _avg?: settingsAvgOrderByAggregateInput
    _max?: settingsMaxOrderByAggregateInput
    _min?: settingsMinOrderByAggregateInput
    _sum?: settingsSumOrderByAggregateInput
  }

  export type settingsScalarWhereWithAggregatesInput = {
    AND?: settingsScalarWhereWithAggregatesInput | settingsScalarWhereWithAggregatesInput[]
    OR?: settingsScalarWhereWithAggregatesInput[]
    NOT?: settingsScalarWhereWithAggregatesInput | settingsScalarWhereWithAggregatesInput[]
    SettingId?: IntWithAggregatesFilter<"settings"> | number
    UserId?: StringWithAggregatesFilter<"settings"> | string
    Notification?: BoolNullableWithAggregatesFilter<"settings"> | boolean | null
    BioMatrics?: BoolNullableWithAggregatesFilter<"settings"> | boolean | null
    COMPCODE?: StringNullableWithAggregatesFilter<"settings"> | string | null
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    username?: StringFilter<"User"> | string
    pic?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    otpemail?: StringNullableFilter<"User"> | string | null
    approval?: StringFilter<"User"> | string
    password?: StringNullableFilter<"User"> | string | null
    Idcard?: StringNullableFilter<"User"> | string | null
    roleId?: StringNullableFilter<"User"> | string | null
    otp?: StringNullableFilter<"User"> | string | null
    hod?: StringNullableFilter<"User"> | string | null
    hr?: StringNullableFilter<"User"> | string | null
    level?: StringFilter<"User"> | string
    verificationOtp?: StringNullableFilter<"User"> | string | null
    expiresAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeNullableFilter<"User"> | Date | string | null
    active?: BoolFilter<"User"> | boolean
    employeeId?: IntNullableFilter<"User"> | number | null
    isAllParty?: BoolFilter<"User"> | boolean
    isAdmin?: BoolFilter<"User"> | boolean
    fcm?: StringNullableFilter<"User"> | string | null
    role?: XOR<RoleNullableScalarRelationFilter, RoleWhereInput> | null
    Companies?: CompanyCodeListRelationFilter
    settings?: SettingsListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    pic?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    otpemail?: SortOrderInput | SortOrder
    approval?: SortOrder
    password?: SortOrderInput | SortOrder
    Idcard?: SortOrderInput | SortOrder
    roleId?: SortOrderInput | SortOrder
    otp?: SortOrderInput | SortOrder
    hod?: SortOrderInput | SortOrder
    hr?: SortOrderInput | SortOrder
    level?: SortOrder
    verificationOtp?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    active?: SortOrder
    employeeId?: SortOrderInput | SortOrder
    isAllParty?: SortOrder
    isAdmin?: SortOrder
    fcm?: SortOrderInput | SortOrder
    role?: RoleOrderByWithRelationInput
    Companies?: CompanyCodeOrderByRelationAggregateInput
    settings?: settingsOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    Idcard?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    pic?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    otpemail?: StringNullableFilter<"User"> | string | null
    approval?: StringFilter<"User"> | string
    password?: StringNullableFilter<"User"> | string | null
    roleId?: StringNullableFilter<"User"> | string | null
    otp?: StringNullableFilter<"User"> | string | null
    hod?: StringNullableFilter<"User"> | string | null
    hr?: StringNullableFilter<"User"> | string | null
    level?: StringFilter<"User"> | string
    verificationOtp?: StringNullableFilter<"User"> | string | null
    expiresAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeNullableFilter<"User"> | Date | string | null
    active?: BoolFilter<"User"> | boolean
    employeeId?: IntNullableFilter<"User"> | number | null
    isAllParty?: BoolFilter<"User"> | boolean
    isAdmin?: BoolFilter<"User"> | boolean
    fcm?: StringNullableFilter<"User"> | string | null
    role?: XOR<RoleNullableScalarRelationFilter, RoleWhereInput> | null
    Companies?: CompanyCodeListRelationFilter
    settings?: SettingsListRelationFilter
  }, "id" | "username" | "Idcard">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    pic?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    otpemail?: SortOrderInput | SortOrder
    approval?: SortOrder
    password?: SortOrderInput | SortOrder
    Idcard?: SortOrderInput | SortOrder
    roleId?: SortOrderInput | SortOrder
    otp?: SortOrderInput | SortOrder
    hod?: SortOrderInput | SortOrder
    hr?: SortOrderInput | SortOrder
    level?: SortOrder
    verificationOtp?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    active?: SortOrder
    employeeId?: SortOrderInput | SortOrder
    isAllParty?: SortOrder
    isAdmin?: SortOrder
    fcm?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    username?: StringWithAggregatesFilter<"User"> | string
    pic?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    otpemail?: StringNullableWithAggregatesFilter<"User"> | string | null
    approval?: StringWithAggregatesFilter<"User"> | string
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    Idcard?: StringNullableWithAggregatesFilter<"User"> | string | null
    roleId?: StringNullableWithAggregatesFilter<"User"> | string | null
    otp?: StringNullableWithAggregatesFilter<"User"> | string | null
    hod?: StringNullableWithAggregatesFilter<"User"> | string | null
    hr?: StringNullableWithAggregatesFilter<"User"> | string | null
    level?: StringWithAggregatesFilter<"User"> | string
    verificationOtp?: StringNullableWithAggregatesFilter<"User"> | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    active?: BoolWithAggregatesFilter<"User"> | boolean
    employeeId?: IntNullableWithAggregatesFilter<"User"> | number | null
    isAllParty?: BoolWithAggregatesFilter<"User"> | boolean
    isAdmin?: BoolWithAggregatesFilter<"User"> | boolean
    fcm?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type CompanyCodeWhereInput = {
    AND?: CompanyCodeWhereInput | CompanyCodeWhereInput[]
    OR?: CompanyCodeWhereInput[]
    NOT?: CompanyCodeWhereInput | CompanyCodeWhereInput[]
    id?: IntFilter<"CompanyCode"> | number
    Idcard?: StringFilter<"CompanyCode"> | string
    companyCode?: StringFilter<"CompanyCode"> | string
    GCOMP?: StringNullableFilter<"CompanyCode"> | string | null
    companyid?: StringFilter<"CompanyCode"> | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CompanyCodeOrderByWithRelationInput = {
    id?: SortOrder
    Idcard?: SortOrder
    companyCode?: SortOrder
    GCOMP?: SortOrderInput | SortOrder
    companyid?: SortOrder
    User?: UserOrderByWithRelationInput
    _relevance?: CompanyCodeOrderByRelevanceInput
  }

  export type CompanyCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CompanyCodeWhereInput | CompanyCodeWhereInput[]
    OR?: CompanyCodeWhereInput[]
    NOT?: CompanyCodeWhereInput | CompanyCodeWhereInput[]
    Idcard?: StringFilter<"CompanyCode"> | string
    companyCode?: StringFilter<"CompanyCode"> | string
    GCOMP?: StringNullableFilter<"CompanyCode"> | string | null
    companyid?: StringFilter<"CompanyCode"> | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type CompanyCodeOrderByWithAggregationInput = {
    id?: SortOrder
    Idcard?: SortOrder
    companyCode?: SortOrder
    GCOMP?: SortOrderInput | SortOrder
    companyid?: SortOrder
    _count?: CompanyCodeCountOrderByAggregateInput
    _avg?: CompanyCodeAvgOrderByAggregateInput
    _max?: CompanyCodeMaxOrderByAggregateInput
    _min?: CompanyCodeMinOrderByAggregateInput
    _sum?: CompanyCodeSumOrderByAggregateInput
  }

  export type CompanyCodeScalarWhereWithAggregatesInput = {
    AND?: CompanyCodeScalarWhereWithAggregatesInput | CompanyCodeScalarWhereWithAggregatesInput[]
    OR?: CompanyCodeScalarWhereWithAggregatesInput[]
    NOT?: CompanyCodeScalarWhereWithAggregatesInput | CompanyCodeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CompanyCode"> | number
    Idcard?: StringWithAggregatesFilter<"CompanyCode"> | string
    companyCode?: StringWithAggregatesFilter<"CompanyCode"> | string
    GCOMP?: StringNullableWithAggregatesFilter<"CompanyCode"> | string | null
    companyid?: StringWithAggregatesFilter<"CompanyCode"> | string
  }

  export type RoleWhereInput = {
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    id?: IntFilter<"Role"> | number
    name?: StringFilter<"Role"> | string
    COMPCODE?: StringFilter<"Role"> | string
    active?: StringFilter<"Role"> | string
    defaultRole?: BoolFilter<"Role"> | boolean
    User?: UserListRelationFilter
    RoleOnPage?: RoleOnPageListRelationFilter
  }

  export type RoleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    COMPCODE?: SortOrder
    active?: SortOrder
    defaultRole?: SortOrder
    User?: UserOrderByRelationAggregateInput
    RoleOnPage?: RoleOnPageOrderByRelationAggregateInput
    _relevance?: RoleOrderByRelevanceInput
  }

  export type RoleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    COMPCODE?: StringFilter<"Role"> | string
    active?: StringFilter<"Role"> | string
    defaultRole?: BoolFilter<"Role"> | boolean
    User?: UserListRelationFilter
    RoleOnPage?: RoleOnPageListRelationFilter
  }, "id" | "name">

  export type RoleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    COMPCODE?: SortOrder
    active?: SortOrder
    defaultRole?: SortOrder
    _count?: RoleCountOrderByAggregateInput
    _avg?: RoleAvgOrderByAggregateInput
    _max?: RoleMaxOrderByAggregateInput
    _min?: RoleMinOrderByAggregateInput
    _sum?: RoleSumOrderByAggregateInput
  }

  export type RoleScalarWhereWithAggregatesInput = {
    AND?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    OR?: RoleScalarWhereWithAggregatesInput[]
    NOT?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Role"> | number
    name?: StringWithAggregatesFilter<"Role"> | string
    COMPCODE?: StringWithAggregatesFilter<"Role"> | string
    active?: StringWithAggregatesFilter<"Role"> | string
    defaultRole?: BoolWithAggregatesFilter<"Role"> | boolean
  }

  export type RoleOnPageWhereInput = {
    AND?: RoleOnPageWhereInput | RoleOnPageWhereInput[]
    OR?: RoleOnPageWhereInput[]
    NOT?: RoleOnPageWhereInput | RoleOnPageWhereInput[]
    id?: IntFilter<"RoleOnPage"> | number
    roleId?: IntNullableFilter<"RoleOnPage"> | number | null
    roleName?: StringFilter<"RoleOnPage"> | string
    read?: BoolFilter<"RoleOnPage"> | boolean
    create?: BoolFilter<"RoleOnPage"> | boolean
    edit?: BoolFilter<"RoleOnPage"> | boolean
    link?: StringFilter<"RoleOnPage"> | string
    delete?: BoolFilter<"RoleOnPage"> | boolean
    isdefault?: BoolFilter<"RoleOnPage"> | boolean
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
  }

  export type RoleOnPageOrderByWithRelationInput = {
    id?: SortOrder
    roleId?: SortOrderInput | SortOrder
    roleName?: SortOrder
    read?: SortOrder
    create?: SortOrder
    edit?: SortOrder
    link?: SortOrder
    delete?: SortOrder
    isdefault?: SortOrder
    role?: RoleOrderByWithRelationInput
    _relevance?: RoleOnPageOrderByRelevanceInput
  }

  export type RoleOnPageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RoleOnPageWhereInput | RoleOnPageWhereInput[]
    OR?: RoleOnPageWhereInput[]
    NOT?: RoleOnPageWhereInput | RoleOnPageWhereInput[]
    roleId?: IntNullableFilter<"RoleOnPage"> | number | null
    roleName?: StringFilter<"RoleOnPage"> | string
    read?: BoolFilter<"RoleOnPage"> | boolean
    create?: BoolFilter<"RoleOnPage"> | boolean
    edit?: BoolFilter<"RoleOnPage"> | boolean
    link?: StringFilter<"RoleOnPage"> | string
    delete?: BoolFilter<"RoleOnPage"> | boolean
    isdefault?: BoolFilter<"RoleOnPage"> | boolean
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
  }, "id">

  export type RoleOnPageOrderByWithAggregationInput = {
    id?: SortOrder
    roleId?: SortOrderInput | SortOrder
    roleName?: SortOrder
    read?: SortOrder
    create?: SortOrder
    edit?: SortOrder
    link?: SortOrder
    delete?: SortOrder
    isdefault?: SortOrder
    _count?: RoleOnPageCountOrderByAggregateInput
    _avg?: RoleOnPageAvgOrderByAggregateInput
    _max?: RoleOnPageMaxOrderByAggregateInput
    _min?: RoleOnPageMinOrderByAggregateInput
    _sum?: RoleOnPageSumOrderByAggregateInput
  }

  export type RoleOnPageScalarWhereWithAggregatesInput = {
    AND?: RoleOnPageScalarWhereWithAggregatesInput | RoleOnPageScalarWhereWithAggregatesInput[]
    OR?: RoleOnPageScalarWhereWithAggregatesInput[]
    NOT?: RoleOnPageScalarWhereWithAggregatesInput | RoleOnPageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RoleOnPage"> | number
    roleId?: IntNullableWithAggregatesFilter<"RoleOnPage"> | number | null
    roleName?: StringWithAggregatesFilter<"RoleOnPage"> | string
    read?: BoolWithAggregatesFilter<"RoleOnPage"> | boolean
    create?: BoolWithAggregatesFilter<"RoleOnPage"> | boolean
    edit?: BoolWithAggregatesFilter<"RoleOnPage"> | boolean
    link?: StringWithAggregatesFilter<"RoleOnPage"> | string
    delete?: BoolWithAggregatesFilter<"RoleOnPage"> | boolean
    isdefault?: BoolWithAggregatesFilter<"RoleOnPage"> | boolean
  }

  export type UserLogWhereInput = {
    AND?: UserLogWhereInput | UserLogWhereInput[]
    OR?: UserLogWhereInput[]
    NOT?: UserLogWhereInput | UserLogWhereInput[]
    id?: IntFilter<"UserLog"> | number
    User?: StringNullableFilter<"UserLog"> | string | null
    MobileName?: StringNullableFilter<"UserLog"> | string | null
    date?: DateTimeFilter<"UserLog"> | Date | string
    MobileIP?: StringNullableFilter<"UserLog"> | string | null
    type?: StringFilter<"UserLog"> | string
    Idcard?: StringNullableFilter<"UserLog"> | string | null
    COMPCODE?: StringNullableFilter<"UserLog"> | string | null
  }

  export type UserLogOrderByWithRelationInput = {
    id?: SortOrder
    User?: SortOrderInput | SortOrder
    MobileName?: SortOrderInput | SortOrder
    date?: SortOrder
    MobileIP?: SortOrderInput | SortOrder
    type?: SortOrder
    Idcard?: SortOrderInput | SortOrder
    COMPCODE?: SortOrderInput | SortOrder
    _relevance?: UserLogOrderByRelevanceInput
  }

  export type UserLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: UserLogWhereInput | UserLogWhereInput[]
    OR?: UserLogWhereInput[]
    NOT?: UserLogWhereInput | UserLogWhereInput[]
    User?: StringNullableFilter<"UserLog"> | string | null
    MobileName?: StringNullableFilter<"UserLog"> | string | null
    date?: DateTimeFilter<"UserLog"> | Date | string
    MobileIP?: StringNullableFilter<"UserLog"> | string | null
    type?: StringFilter<"UserLog"> | string
    Idcard?: StringNullableFilter<"UserLog"> | string | null
    COMPCODE?: StringNullableFilter<"UserLog"> | string | null
  }, "id">

  export type UserLogOrderByWithAggregationInput = {
    id?: SortOrder
    User?: SortOrderInput | SortOrder
    MobileName?: SortOrderInput | SortOrder
    date?: SortOrder
    MobileIP?: SortOrderInput | SortOrder
    type?: SortOrder
    Idcard?: SortOrderInput | SortOrder
    COMPCODE?: SortOrderInput | SortOrder
    _count?: UserLogCountOrderByAggregateInput
    _avg?: UserLogAvgOrderByAggregateInput
    _max?: UserLogMaxOrderByAggregateInput
    _min?: UserLogMinOrderByAggregateInput
    _sum?: UserLogSumOrderByAggregateInput
  }

  export type UserLogScalarWhereWithAggregatesInput = {
    AND?: UserLogScalarWhereWithAggregatesInput | UserLogScalarWhereWithAggregatesInput[]
    OR?: UserLogScalarWhereWithAggregatesInput[]
    NOT?: UserLogScalarWhereWithAggregatesInput | UserLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserLog"> | number
    User?: StringNullableWithAggregatesFilter<"UserLog"> | string | null
    MobileName?: StringNullableWithAggregatesFilter<"UserLog"> | string | null
    date?: DateTimeWithAggregatesFilter<"UserLog"> | Date | string
    MobileIP?: StringNullableWithAggregatesFilter<"UserLog"> | string | null
    type?: StringWithAggregatesFilter<"UserLog"> | string
    Idcard?: StringNullableWithAggregatesFilter<"UserLog"> | string | null
    COMPCODE?: StringNullableWithAggregatesFilter<"UserLog"> | string | null
  }

  export type settingsCreateInput = {
    Notification?: boolean | null
    BioMatrics?: boolean | null
    COMPCODE?: string | null
    user: UserCreateNestedOneWithoutSettingsInput
  }

  export type settingsUncheckedCreateInput = {
    SettingId?: number
    UserId: string
    Notification?: boolean | null
    BioMatrics?: boolean | null
    COMPCODE?: string | null
  }

  export type settingsUpdateInput = {
    Notification?: NullableBoolFieldUpdateOperationsInput | boolean | null
    BioMatrics?: NullableBoolFieldUpdateOperationsInput | boolean | null
    COMPCODE?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutSettingsNestedInput
  }

  export type settingsUncheckedUpdateInput = {
    SettingId?: IntFieldUpdateOperationsInput | number
    UserId?: StringFieldUpdateOperationsInput | string
    Notification?: NullableBoolFieldUpdateOperationsInput | boolean | null
    BioMatrics?: NullableBoolFieldUpdateOperationsInput | boolean | null
    COMPCODE?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type settingsCreateManyInput = {
    SettingId?: number
    UserId: string
    Notification?: boolean | null
    BioMatrics?: boolean | null
    COMPCODE?: string | null
  }

  export type settingsUpdateManyMutationInput = {
    Notification?: NullableBoolFieldUpdateOperationsInput | boolean | null
    BioMatrics?: NullableBoolFieldUpdateOperationsInput | boolean | null
    COMPCODE?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type settingsUncheckedUpdateManyInput = {
    SettingId?: IntFieldUpdateOperationsInput | number
    UserId?: StringFieldUpdateOperationsInput | string
    Notification?: NullableBoolFieldUpdateOperationsInput | boolean | null
    BioMatrics?: NullableBoolFieldUpdateOperationsInput | boolean | null
    COMPCODE?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateInput = {
    username: string
    pic?: string | null
    email?: string | null
    otpemail?: string | null
    approval?: string
    password?: string | null
    Idcard?: string | null
    otp?: string | null
    hod?: string | null
    hr?: string | null
    level?: string
    verificationOtp?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string | null
    active?: boolean
    employeeId?: number | null
    isAllParty?: boolean
    isAdmin?: boolean
    fcm?: string | null
    role?: RoleCreateNestedOneWithoutUserInput
    Companies?: CompanyCodeCreateNestedManyWithoutUserInput
    settings?: settingsCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    username: string
    pic?: string | null
    email?: string | null
    otpemail?: string | null
    approval?: string
    password?: string | null
    Idcard?: string | null
    roleId?: string | null
    otp?: string | null
    hod?: string | null
    hr?: string | null
    level?: string
    verificationOtp?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string | null
    active?: boolean
    employeeId?: number | null
    isAllParty?: boolean
    isAdmin?: boolean
    fcm?: string | null
    Companies?: CompanyCodeUncheckedCreateNestedManyWithoutUserInput
    settings?: settingsUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    otpemail?: NullableStringFieldUpdateOperationsInput | string | null
    approval?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    Idcard?: NullableStringFieldUpdateOperationsInput | string | null
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    hod?: NullableStringFieldUpdateOperationsInput | string | null
    hr?: NullableStringFieldUpdateOperationsInput | string | null
    level?: StringFieldUpdateOperationsInput | string
    verificationOtp?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    employeeId?: NullableIntFieldUpdateOperationsInput | number | null
    isAllParty?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    fcm?: NullableStringFieldUpdateOperationsInput | string | null
    role?: RoleUpdateOneWithoutUserNestedInput
    Companies?: CompanyCodeUpdateManyWithoutUserNestedInput
    settings?: settingsUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    otpemail?: NullableStringFieldUpdateOperationsInput | string | null
    approval?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    Idcard?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    hod?: NullableStringFieldUpdateOperationsInput | string | null
    hr?: NullableStringFieldUpdateOperationsInput | string | null
    level?: StringFieldUpdateOperationsInput | string
    verificationOtp?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    employeeId?: NullableIntFieldUpdateOperationsInput | number | null
    isAllParty?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    fcm?: NullableStringFieldUpdateOperationsInput | string | null
    Companies?: CompanyCodeUncheckedUpdateManyWithoutUserNestedInput
    settings?: settingsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    username: string
    pic?: string | null
    email?: string | null
    otpemail?: string | null
    approval?: string
    password?: string | null
    Idcard?: string | null
    roleId?: string | null
    otp?: string | null
    hod?: string | null
    hr?: string | null
    level?: string
    verificationOtp?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string | null
    active?: boolean
    employeeId?: number | null
    isAllParty?: boolean
    isAdmin?: boolean
    fcm?: string | null
  }

  export type UserUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    otpemail?: NullableStringFieldUpdateOperationsInput | string | null
    approval?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    Idcard?: NullableStringFieldUpdateOperationsInput | string | null
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    hod?: NullableStringFieldUpdateOperationsInput | string | null
    hr?: NullableStringFieldUpdateOperationsInput | string | null
    level?: StringFieldUpdateOperationsInput | string
    verificationOtp?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    employeeId?: NullableIntFieldUpdateOperationsInput | number | null
    isAllParty?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    fcm?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    otpemail?: NullableStringFieldUpdateOperationsInput | string | null
    approval?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    Idcard?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    hod?: NullableStringFieldUpdateOperationsInput | string | null
    hr?: NullableStringFieldUpdateOperationsInput | string | null
    level?: StringFieldUpdateOperationsInput | string
    verificationOtp?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    employeeId?: NullableIntFieldUpdateOperationsInput | number | null
    isAllParty?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    fcm?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CompanyCodeCreateInput = {
    companyCode: string
    GCOMP?: string | null
    companyid: string
    User: UserCreateNestedOneWithoutCompaniesInput
  }

  export type CompanyCodeUncheckedCreateInput = {
    id?: number
    Idcard: string
    companyCode: string
    GCOMP?: string | null
    companyid: string
  }

  export type CompanyCodeUpdateInput = {
    companyCode?: StringFieldUpdateOperationsInput | string
    GCOMP?: NullableStringFieldUpdateOperationsInput | string | null
    companyid?: StringFieldUpdateOperationsInput | string
    User?: UserUpdateOneRequiredWithoutCompaniesNestedInput
  }

  export type CompanyCodeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    Idcard?: StringFieldUpdateOperationsInput | string
    companyCode?: StringFieldUpdateOperationsInput | string
    GCOMP?: NullableStringFieldUpdateOperationsInput | string | null
    companyid?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyCodeCreateManyInput = {
    id?: number
    Idcard: string
    companyCode: string
    GCOMP?: string | null
    companyid: string
  }

  export type CompanyCodeUpdateManyMutationInput = {
    companyCode?: StringFieldUpdateOperationsInput | string
    GCOMP?: NullableStringFieldUpdateOperationsInput | string | null
    companyid?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyCodeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    Idcard?: StringFieldUpdateOperationsInput | string
    companyCode?: StringFieldUpdateOperationsInput | string
    GCOMP?: NullableStringFieldUpdateOperationsInput | string | null
    companyid?: StringFieldUpdateOperationsInput | string
  }

  export type RoleCreateInput = {
    name: string
    COMPCODE?: string
    active?: string
    defaultRole?: boolean
    User?: UserCreateNestedManyWithoutRoleInput
    RoleOnPage?: RoleOnPageCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateInput = {
    id?: number
    name: string
    COMPCODE?: string
    active?: string
    defaultRole?: boolean
    User?: UserUncheckedCreateNestedManyWithoutRoleInput
    RoleOnPage?: RoleOnPageUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    COMPCODE?: StringFieldUpdateOperationsInput | string
    active?: StringFieldUpdateOperationsInput | string
    defaultRole?: BoolFieldUpdateOperationsInput | boolean
    User?: UserUpdateManyWithoutRoleNestedInput
    RoleOnPage?: RoleOnPageUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    COMPCODE?: StringFieldUpdateOperationsInput | string
    active?: StringFieldUpdateOperationsInput | string
    defaultRole?: BoolFieldUpdateOperationsInput | boolean
    User?: UserUncheckedUpdateManyWithoutRoleNestedInput
    RoleOnPage?: RoleOnPageUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type RoleCreateManyInput = {
    id?: number
    name: string
    COMPCODE?: string
    active?: string
    defaultRole?: boolean
  }

  export type RoleUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    COMPCODE?: StringFieldUpdateOperationsInput | string
    active?: StringFieldUpdateOperationsInput | string
    defaultRole?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RoleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    COMPCODE?: StringFieldUpdateOperationsInput | string
    active?: StringFieldUpdateOperationsInput | string
    defaultRole?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RoleOnPageCreateInput = {
    roleId?: number | null
    read?: boolean
    create?: boolean
    edit?: boolean
    link: string
    delete?: boolean
    isdefault?: boolean
    role: RoleCreateNestedOneWithoutRoleOnPageInput
  }

  export type RoleOnPageUncheckedCreateInput = {
    id?: number
    roleId?: number | null
    roleName: string
    read?: boolean
    create?: boolean
    edit?: boolean
    link: string
    delete?: boolean
    isdefault?: boolean
  }

  export type RoleOnPageUpdateInput = {
    roleId?: NullableIntFieldUpdateOperationsInput | number | null
    read?: BoolFieldUpdateOperationsInput | boolean
    create?: BoolFieldUpdateOperationsInput | boolean
    edit?: BoolFieldUpdateOperationsInput | boolean
    link?: StringFieldUpdateOperationsInput | string
    delete?: BoolFieldUpdateOperationsInput | boolean
    isdefault?: BoolFieldUpdateOperationsInput | boolean
    role?: RoleUpdateOneRequiredWithoutRoleOnPageNestedInput
  }

  export type RoleOnPageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    roleId?: NullableIntFieldUpdateOperationsInput | number | null
    roleName?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    create?: BoolFieldUpdateOperationsInput | boolean
    edit?: BoolFieldUpdateOperationsInput | boolean
    link?: StringFieldUpdateOperationsInput | string
    delete?: BoolFieldUpdateOperationsInput | boolean
    isdefault?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RoleOnPageCreateManyInput = {
    id?: number
    roleId?: number | null
    roleName: string
    read?: boolean
    create?: boolean
    edit?: boolean
    link: string
    delete?: boolean
    isdefault?: boolean
  }

  export type RoleOnPageUpdateManyMutationInput = {
    roleId?: NullableIntFieldUpdateOperationsInput | number | null
    read?: BoolFieldUpdateOperationsInput | boolean
    create?: BoolFieldUpdateOperationsInput | boolean
    edit?: BoolFieldUpdateOperationsInput | boolean
    link?: StringFieldUpdateOperationsInput | string
    delete?: BoolFieldUpdateOperationsInput | boolean
    isdefault?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RoleOnPageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    roleId?: NullableIntFieldUpdateOperationsInput | number | null
    roleName?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    create?: BoolFieldUpdateOperationsInput | boolean
    edit?: BoolFieldUpdateOperationsInput | boolean
    link?: StringFieldUpdateOperationsInput | string
    delete?: BoolFieldUpdateOperationsInput | boolean
    isdefault?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserLogCreateInput = {
    User?: string | null
    MobileName?: string | null
    date?: Date | string
    MobileIP?: string | null
    type: string
    Idcard?: string | null
    COMPCODE?: string | null
  }

  export type UserLogUncheckedCreateInput = {
    id?: number
    User?: string | null
    MobileName?: string | null
    date?: Date | string
    MobileIP?: string | null
    type: string
    Idcard?: string | null
    COMPCODE?: string | null
  }

  export type UserLogUpdateInput = {
    User?: NullableStringFieldUpdateOperationsInput | string | null
    MobileName?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    MobileIP?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    Idcard?: NullableStringFieldUpdateOperationsInput | string | null
    COMPCODE?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    User?: NullableStringFieldUpdateOperationsInput | string | null
    MobileName?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    MobileIP?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    Idcard?: NullableStringFieldUpdateOperationsInput | string | null
    COMPCODE?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserLogCreateManyInput = {
    id?: number
    User?: string | null
    MobileName?: string | null
    date?: Date | string
    MobileIP?: string | null
    type: string
    Idcard?: string | null
    COMPCODE?: string | null
  }

  export type UserLogUpdateManyMutationInput = {
    User?: NullableStringFieldUpdateOperationsInput | string | null
    MobileName?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    MobileIP?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    Idcard?: NullableStringFieldUpdateOperationsInput | string | null
    COMPCODE?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    User?: NullableStringFieldUpdateOperationsInput | string | null
    MobileName?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    MobileIP?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    Idcard?: NullableStringFieldUpdateOperationsInput | string | null
    COMPCODE?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type settingsOrderByRelevanceInput = {
    fields: settingsOrderByRelevanceFieldEnum | settingsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type settingsCountOrderByAggregateInput = {
    SettingId?: SortOrder
    UserId?: SortOrder
    Notification?: SortOrder
    BioMatrics?: SortOrder
    COMPCODE?: SortOrder
  }

  export type settingsAvgOrderByAggregateInput = {
    SettingId?: SortOrder
  }

  export type settingsMaxOrderByAggregateInput = {
    SettingId?: SortOrder
    UserId?: SortOrder
    Notification?: SortOrder
    BioMatrics?: SortOrder
    COMPCODE?: SortOrder
  }

  export type settingsMinOrderByAggregateInput = {
    SettingId?: SortOrder
    UserId?: SortOrder
    Notification?: SortOrder
    BioMatrics?: SortOrder
    COMPCODE?: SortOrder
  }

  export type settingsSumOrderByAggregateInput = {
    SettingId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type RoleNullableScalarRelationFilter = {
    is?: RoleWhereInput | null
    isNot?: RoleWhereInput | null
  }

  export type CompanyCodeListRelationFilter = {
    every?: CompanyCodeWhereInput
    some?: CompanyCodeWhereInput
    none?: CompanyCodeWhereInput
  }

  export type SettingsListRelationFilter = {
    every?: settingsWhereInput
    some?: settingsWhereInput
    none?: settingsWhereInput
  }

  export type CompanyCodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type settingsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    pic?: SortOrder
    email?: SortOrder
    otpemail?: SortOrder
    approval?: SortOrder
    password?: SortOrder
    Idcard?: SortOrder
    roleId?: SortOrder
    otp?: SortOrder
    hod?: SortOrder
    hr?: SortOrder
    level?: SortOrder
    verificationOtp?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    active?: SortOrder
    employeeId?: SortOrder
    isAllParty?: SortOrder
    isAdmin?: SortOrder
    fcm?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    pic?: SortOrder
    email?: SortOrder
    otpemail?: SortOrder
    approval?: SortOrder
    password?: SortOrder
    Idcard?: SortOrder
    roleId?: SortOrder
    otp?: SortOrder
    hod?: SortOrder
    hr?: SortOrder
    level?: SortOrder
    verificationOtp?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    active?: SortOrder
    employeeId?: SortOrder
    isAllParty?: SortOrder
    isAdmin?: SortOrder
    fcm?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    pic?: SortOrder
    email?: SortOrder
    otpemail?: SortOrder
    approval?: SortOrder
    password?: SortOrder
    Idcard?: SortOrder
    roleId?: SortOrder
    otp?: SortOrder
    hod?: SortOrder
    hr?: SortOrder
    level?: SortOrder
    verificationOtp?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    active?: SortOrder
    employeeId?: SortOrder
    isAllParty?: SortOrder
    isAdmin?: SortOrder
    fcm?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type CompanyCodeOrderByRelevanceInput = {
    fields: CompanyCodeOrderByRelevanceFieldEnum | CompanyCodeOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CompanyCodeCountOrderByAggregateInput = {
    id?: SortOrder
    Idcard?: SortOrder
    companyCode?: SortOrder
    GCOMP?: SortOrder
    companyid?: SortOrder
  }

  export type CompanyCodeAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CompanyCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    Idcard?: SortOrder
    companyCode?: SortOrder
    GCOMP?: SortOrder
    companyid?: SortOrder
  }

  export type CompanyCodeMinOrderByAggregateInput = {
    id?: SortOrder
    Idcard?: SortOrder
    companyCode?: SortOrder
    GCOMP?: SortOrder
    companyid?: SortOrder
  }

  export type CompanyCodeSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type RoleOnPageListRelationFilter = {
    every?: RoleOnPageWhereInput
    some?: RoleOnPageWhereInput
    none?: RoleOnPageWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoleOnPageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoleOrderByRelevanceInput = {
    fields: RoleOrderByRelevanceFieldEnum | RoleOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type RoleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    COMPCODE?: SortOrder
    active?: SortOrder
    defaultRole?: SortOrder
  }

  export type RoleAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RoleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    COMPCODE?: SortOrder
    active?: SortOrder
    defaultRole?: SortOrder
  }

  export type RoleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    COMPCODE?: SortOrder
    active?: SortOrder
    defaultRole?: SortOrder
  }

  export type RoleSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RoleScalarRelationFilter = {
    is?: RoleWhereInput
    isNot?: RoleWhereInput
  }

  export type RoleOnPageOrderByRelevanceInput = {
    fields: RoleOnPageOrderByRelevanceFieldEnum | RoleOnPageOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type RoleOnPageCountOrderByAggregateInput = {
    id?: SortOrder
    roleId?: SortOrder
    roleName?: SortOrder
    read?: SortOrder
    create?: SortOrder
    edit?: SortOrder
    link?: SortOrder
    delete?: SortOrder
    isdefault?: SortOrder
  }

  export type RoleOnPageAvgOrderByAggregateInput = {
    id?: SortOrder
    roleId?: SortOrder
  }

  export type RoleOnPageMaxOrderByAggregateInput = {
    id?: SortOrder
    roleId?: SortOrder
    roleName?: SortOrder
    read?: SortOrder
    create?: SortOrder
    edit?: SortOrder
    link?: SortOrder
    delete?: SortOrder
    isdefault?: SortOrder
  }

  export type RoleOnPageMinOrderByAggregateInput = {
    id?: SortOrder
    roleId?: SortOrder
    roleName?: SortOrder
    read?: SortOrder
    create?: SortOrder
    edit?: SortOrder
    link?: SortOrder
    delete?: SortOrder
    isdefault?: SortOrder
  }

  export type RoleOnPageSumOrderByAggregateInput = {
    id?: SortOrder
    roleId?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserLogOrderByRelevanceInput = {
    fields: UserLogOrderByRelevanceFieldEnum | UserLogOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserLogCountOrderByAggregateInput = {
    id?: SortOrder
    User?: SortOrder
    MobileName?: SortOrder
    date?: SortOrder
    MobileIP?: SortOrder
    type?: SortOrder
    Idcard?: SortOrder
    COMPCODE?: SortOrder
  }

  export type UserLogAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserLogMaxOrderByAggregateInput = {
    id?: SortOrder
    User?: SortOrder
    MobileName?: SortOrder
    date?: SortOrder
    MobileIP?: SortOrder
    type?: SortOrder
    Idcard?: SortOrder
    COMPCODE?: SortOrder
  }

  export type UserLogMinOrderByAggregateInput = {
    id?: SortOrder
    User?: SortOrder
    MobileName?: SortOrder
    date?: SortOrder
    MobileIP?: SortOrder
    type?: SortOrder
    Idcard?: SortOrder
    COMPCODE?: SortOrder
  }

  export type UserLogSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserCreateNestedOneWithoutSettingsInput = {
    create?: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSettingsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdateOneRequiredWithoutSettingsNestedInput = {
    create?: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSettingsInput
    upsert?: UserUpsertWithoutSettingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSettingsInput, UserUpdateWithoutSettingsInput>, UserUncheckedUpdateWithoutSettingsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type RoleCreateNestedOneWithoutUserInput = {
    create?: XOR<RoleCreateWithoutUserInput, RoleUncheckedCreateWithoutUserInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUserInput
    connect?: RoleWhereUniqueInput
  }

  export type CompanyCodeCreateNestedManyWithoutUserInput = {
    create?: XOR<CompanyCodeCreateWithoutUserInput, CompanyCodeUncheckedCreateWithoutUserInput> | CompanyCodeCreateWithoutUserInput[] | CompanyCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CompanyCodeCreateOrConnectWithoutUserInput | CompanyCodeCreateOrConnectWithoutUserInput[]
    createMany?: CompanyCodeCreateManyUserInputEnvelope
    connect?: CompanyCodeWhereUniqueInput | CompanyCodeWhereUniqueInput[]
  }

  export type settingsCreateNestedManyWithoutUserInput = {
    create?: XOR<settingsCreateWithoutUserInput, settingsUncheckedCreateWithoutUserInput> | settingsCreateWithoutUserInput[] | settingsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: settingsCreateOrConnectWithoutUserInput | settingsCreateOrConnectWithoutUserInput[]
    createMany?: settingsCreateManyUserInputEnvelope
    connect?: settingsWhereUniqueInput | settingsWhereUniqueInput[]
  }

  export type CompanyCodeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CompanyCodeCreateWithoutUserInput, CompanyCodeUncheckedCreateWithoutUserInput> | CompanyCodeCreateWithoutUserInput[] | CompanyCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CompanyCodeCreateOrConnectWithoutUserInput | CompanyCodeCreateOrConnectWithoutUserInput[]
    createMany?: CompanyCodeCreateManyUserInputEnvelope
    connect?: CompanyCodeWhereUniqueInput | CompanyCodeWhereUniqueInput[]
  }

  export type settingsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<settingsCreateWithoutUserInput, settingsUncheckedCreateWithoutUserInput> | settingsCreateWithoutUserInput[] | settingsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: settingsCreateOrConnectWithoutUserInput | settingsCreateOrConnectWithoutUserInput[]
    createMany?: settingsCreateManyUserInputEnvelope
    connect?: settingsWhereUniqueInput | settingsWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type RoleUpdateOneWithoutUserNestedInput = {
    create?: XOR<RoleCreateWithoutUserInput, RoleUncheckedCreateWithoutUserInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUserInput
    upsert?: RoleUpsertWithoutUserInput
    disconnect?: RoleWhereInput | boolean
    delete?: RoleWhereInput | boolean
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutUserInput, RoleUpdateWithoutUserInput>, RoleUncheckedUpdateWithoutUserInput>
  }

  export type CompanyCodeUpdateManyWithoutUserNestedInput = {
    create?: XOR<CompanyCodeCreateWithoutUserInput, CompanyCodeUncheckedCreateWithoutUserInput> | CompanyCodeCreateWithoutUserInput[] | CompanyCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CompanyCodeCreateOrConnectWithoutUserInput | CompanyCodeCreateOrConnectWithoutUserInput[]
    upsert?: CompanyCodeUpsertWithWhereUniqueWithoutUserInput | CompanyCodeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CompanyCodeCreateManyUserInputEnvelope
    set?: CompanyCodeWhereUniqueInput | CompanyCodeWhereUniqueInput[]
    disconnect?: CompanyCodeWhereUniqueInput | CompanyCodeWhereUniqueInput[]
    delete?: CompanyCodeWhereUniqueInput | CompanyCodeWhereUniqueInput[]
    connect?: CompanyCodeWhereUniqueInput | CompanyCodeWhereUniqueInput[]
    update?: CompanyCodeUpdateWithWhereUniqueWithoutUserInput | CompanyCodeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CompanyCodeUpdateManyWithWhereWithoutUserInput | CompanyCodeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CompanyCodeScalarWhereInput | CompanyCodeScalarWhereInput[]
  }

  export type settingsUpdateManyWithoutUserNestedInput = {
    create?: XOR<settingsCreateWithoutUserInput, settingsUncheckedCreateWithoutUserInput> | settingsCreateWithoutUserInput[] | settingsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: settingsCreateOrConnectWithoutUserInput | settingsCreateOrConnectWithoutUserInput[]
    upsert?: settingsUpsertWithWhereUniqueWithoutUserInput | settingsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: settingsCreateManyUserInputEnvelope
    set?: settingsWhereUniqueInput | settingsWhereUniqueInput[]
    disconnect?: settingsWhereUniqueInput | settingsWhereUniqueInput[]
    delete?: settingsWhereUniqueInput | settingsWhereUniqueInput[]
    connect?: settingsWhereUniqueInput | settingsWhereUniqueInput[]
    update?: settingsUpdateWithWhereUniqueWithoutUserInput | settingsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: settingsUpdateManyWithWhereWithoutUserInput | settingsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: settingsScalarWhereInput | settingsScalarWhereInput[]
  }

  export type CompanyCodeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CompanyCodeCreateWithoutUserInput, CompanyCodeUncheckedCreateWithoutUserInput> | CompanyCodeCreateWithoutUserInput[] | CompanyCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CompanyCodeCreateOrConnectWithoutUserInput | CompanyCodeCreateOrConnectWithoutUserInput[]
    upsert?: CompanyCodeUpsertWithWhereUniqueWithoutUserInput | CompanyCodeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CompanyCodeCreateManyUserInputEnvelope
    set?: CompanyCodeWhereUniqueInput | CompanyCodeWhereUniqueInput[]
    disconnect?: CompanyCodeWhereUniqueInput | CompanyCodeWhereUniqueInput[]
    delete?: CompanyCodeWhereUniqueInput | CompanyCodeWhereUniqueInput[]
    connect?: CompanyCodeWhereUniqueInput | CompanyCodeWhereUniqueInput[]
    update?: CompanyCodeUpdateWithWhereUniqueWithoutUserInput | CompanyCodeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CompanyCodeUpdateManyWithWhereWithoutUserInput | CompanyCodeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CompanyCodeScalarWhereInput | CompanyCodeScalarWhereInput[]
  }

  export type settingsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<settingsCreateWithoutUserInput, settingsUncheckedCreateWithoutUserInput> | settingsCreateWithoutUserInput[] | settingsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: settingsCreateOrConnectWithoutUserInput | settingsCreateOrConnectWithoutUserInput[]
    upsert?: settingsUpsertWithWhereUniqueWithoutUserInput | settingsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: settingsCreateManyUserInputEnvelope
    set?: settingsWhereUniqueInput | settingsWhereUniqueInput[]
    disconnect?: settingsWhereUniqueInput | settingsWhereUniqueInput[]
    delete?: settingsWhereUniqueInput | settingsWhereUniqueInput[]
    connect?: settingsWhereUniqueInput | settingsWhereUniqueInput[]
    update?: settingsUpdateWithWhereUniqueWithoutUserInput | settingsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: settingsUpdateManyWithWhereWithoutUserInput | settingsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: settingsScalarWhereInput | settingsScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCompaniesInput = {
    create?: XOR<UserCreateWithoutCompaniesInput, UserUncheckedCreateWithoutCompaniesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCompaniesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCompaniesNestedInput = {
    create?: XOR<UserCreateWithoutCompaniesInput, UserUncheckedCreateWithoutCompaniesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCompaniesInput
    upsert?: UserUpsertWithoutCompaniesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCompaniesInput, UserUpdateWithoutCompaniesInput>, UserUncheckedUpdateWithoutCompaniesInput>
  }

  export type UserCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type RoleOnPageCreateNestedManyWithoutRoleInput = {
    create?: XOR<RoleOnPageCreateWithoutRoleInput, RoleOnPageUncheckedCreateWithoutRoleInput> | RoleOnPageCreateWithoutRoleInput[] | RoleOnPageUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RoleOnPageCreateOrConnectWithoutRoleInput | RoleOnPageCreateOrConnectWithoutRoleInput[]
    createMany?: RoleOnPageCreateManyRoleInputEnvelope
    connect?: RoleOnPageWhereUniqueInput | RoleOnPageWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type RoleOnPageUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<RoleOnPageCreateWithoutRoleInput, RoleOnPageUncheckedCreateWithoutRoleInput> | RoleOnPageCreateWithoutRoleInput[] | RoleOnPageUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RoleOnPageCreateOrConnectWithoutRoleInput | RoleOnPageCreateOrConnectWithoutRoleInput[]
    createMany?: RoleOnPageCreateManyRoleInputEnvelope
    connect?: RoleOnPageWhereUniqueInput | RoleOnPageWhereUniqueInput[]
  }

  export type UserUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutRoleInput | UserUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutRoleInput | UserUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserUpdateManyWithWhereWithoutRoleInput | UserUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type RoleOnPageUpdateManyWithoutRoleNestedInput = {
    create?: XOR<RoleOnPageCreateWithoutRoleInput, RoleOnPageUncheckedCreateWithoutRoleInput> | RoleOnPageCreateWithoutRoleInput[] | RoleOnPageUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RoleOnPageCreateOrConnectWithoutRoleInput | RoleOnPageCreateOrConnectWithoutRoleInput[]
    upsert?: RoleOnPageUpsertWithWhereUniqueWithoutRoleInput | RoleOnPageUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: RoleOnPageCreateManyRoleInputEnvelope
    set?: RoleOnPageWhereUniqueInput | RoleOnPageWhereUniqueInput[]
    disconnect?: RoleOnPageWhereUniqueInput | RoleOnPageWhereUniqueInput[]
    delete?: RoleOnPageWhereUniqueInput | RoleOnPageWhereUniqueInput[]
    connect?: RoleOnPageWhereUniqueInput | RoleOnPageWhereUniqueInput[]
    update?: RoleOnPageUpdateWithWhereUniqueWithoutRoleInput | RoleOnPageUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: RoleOnPageUpdateManyWithWhereWithoutRoleInput | RoleOnPageUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: RoleOnPageScalarWhereInput | RoleOnPageScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutRoleInput | UserUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutRoleInput | UserUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserUpdateManyWithWhereWithoutRoleInput | UserUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type RoleOnPageUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<RoleOnPageCreateWithoutRoleInput, RoleOnPageUncheckedCreateWithoutRoleInput> | RoleOnPageCreateWithoutRoleInput[] | RoleOnPageUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RoleOnPageCreateOrConnectWithoutRoleInput | RoleOnPageCreateOrConnectWithoutRoleInput[]
    upsert?: RoleOnPageUpsertWithWhereUniqueWithoutRoleInput | RoleOnPageUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: RoleOnPageCreateManyRoleInputEnvelope
    set?: RoleOnPageWhereUniqueInput | RoleOnPageWhereUniqueInput[]
    disconnect?: RoleOnPageWhereUniqueInput | RoleOnPageWhereUniqueInput[]
    delete?: RoleOnPageWhereUniqueInput | RoleOnPageWhereUniqueInput[]
    connect?: RoleOnPageWhereUniqueInput | RoleOnPageWhereUniqueInput[]
    update?: RoleOnPageUpdateWithWhereUniqueWithoutRoleInput | RoleOnPageUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: RoleOnPageUpdateManyWithWhereWithoutRoleInput | RoleOnPageUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: RoleOnPageScalarWhereInput | RoleOnPageScalarWhereInput[]
  }

  export type RoleCreateNestedOneWithoutRoleOnPageInput = {
    create?: XOR<RoleCreateWithoutRoleOnPageInput, RoleUncheckedCreateWithoutRoleOnPageInput>
    connectOrCreate?: RoleCreateOrConnectWithoutRoleOnPageInput
    connect?: RoleWhereUniqueInput
  }

  export type RoleUpdateOneRequiredWithoutRoleOnPageNestedInput = {
    create?: XOR<RoleCreateWithoutRoleOnPageInput, RoleUncheckedCreateWithoutRoleOnPageInput>
    connectOrCreate?: RoleCreateOrConnectWithoutRoleOnPageInput
    upsert?: RoleUpsertWithoutRoleOnPageInput
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutRoleOnPageInput, RoleUpdateWithoutRoleOnPageInput>, RoleUncheckedUpdateWithoutRoleOnPageInput>
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserCreateWithoutSettingsInput = {
    username: string
    pic?: string | null
    email?: string | null
    otpemail?: string | null
    approval?: string
    password?: string | null
    Idcard?: string | null
    otp?: string | null
    hod?: string | null
    hr?: string | null
    level?: string
    verificationOtp?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string | null
    active?: boolean
    employeeId?: number | null
    isAllParty?: boolean
    isAdmin?: boolean
    fcm?: string | null
    role?: RoleCreateNestedOneWithoutUserInput
    Companies?: CompanyCodeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSettingsInput = {
    id?: number
    username: string
    pic?: string | null
    email?: string | null
    otpemail?: string | null
    approval?: string
    password?: string | null
    Idcard?: string | null
    roleId?: string | null
    otp?: string | null
    hod?: string | null
    hr?: string | null
    level?: string
    verificationOtp?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string | null
    active?: boolean
    employeeId?: number | null
    isAllParty?: boolean
    isAdmin?: boolean
    fcm?: string | null
    Companies?: CompanyCodeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSettingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
  }

  export type UserUpsertWithoutSettingsInput = {
    update: XOR<UserUpdateWithoutSettingsInput, UserUncheckedUpdateWithoutSettingsInput>
    create: XOR<UserCreateWithoutSettingsInput, UserUncheckedCreateWithoutSettingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSettingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSettingsInput, UserUncheckedUpdateWithoutSettingsInput>
  }

  export type UserUpdateWithoutSettingsInput = {
    username?: StringFieldUpdateOperationsInput | string
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    otpemail?: NullableStringFieldUpdateOperationsInput | string | null
    approval?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    Idcard?: NullableStringFieldUpdateOperationsInput | string | null
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    hod?: NullableStringFieldUpdateOperationsInput | string | null
    hr?: NullableStringFieldUpdateOperationsInput | string | null
    level?: StringFieldUpdateOperationsInput | string
    verificationOtp?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    employeeId?: NullableIntFieldUpdateOperationsInput | number | null
    isAllParty?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    fcm?: NullableStringFieldUpdateOperationsInput | string | null
    role?: RoleUpdateOneWithoutUserNestedInput
    Companies?: CompanyCodeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSettingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    otpemail?: NullableStringFieldUpdateOperationsInput | string | null
    approval?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    Idcard?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    hod?: NullableStringFieldUpdateOperationsInput | string | null
    hr?: NullableStringFieldUpdateOperationsInput | string | null
    level?: StringFieldUpdateOperationsInput | string
    verificationOtp?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    employeeId?: NullableIntFieldUpdateOperationsInput | number | null
    isAllParty?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    fcm?: NullableStringFieldUpdateOperationsInput | string | null
    Companies?: CompanyCodeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RoleCreateWithoutUserInput = {
    name: string
    COMPCODE?: string
    active?: string
    defaultRole?: boolean
    RoleOnPage?: RoleOnPageCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateWithoutUserInput = {
    id?: number
    name: string
    COMPCODE?: string
    active?: string
    defaultRole?: boolean
    RoleOnPage?: RoleOnPageUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleCreateOrConnectWithoutUserInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutUserInput, RoleUncheckedCreateWithoutUserInput>
  }

  export type CompanyCodeCreateWithoutUserInput = {
    companyCode: string
    GCOMP?: string | null
    companyid: string
  }

  export type CompanyCodeUncheckedCreateWithoutUserInput = {
    id?: number
    companyCode: string
    GCOMP?: string | null
    companyid: string
  }

  export type CompanyCodeCreateOrConnectWithoutUserInput = {
    where: CompanyCodeWhereUniqueInput
    create: XOR<CompanyCodeCreateWithoutUserInput, CompanyCodeUncheckedCreateWithoutUserInput>
  }

  export type CompanyCodeCreateManyUserInputEnvelope = {
    data: CompanyCodeCreateManyUserInput | CompanyCodeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type settingsCreateWithoutUserInput = {
    Notification?: boolean | null
    BioMatrics?: boolean | null
    COMPCODE?: string | null
  }

  export type settingsUncheckedCreateWithoutUserInput = {
    SettingId?: number
    Notification?: boolean | null
    BioMatrics?: boolean | null
    COMPCODE?: string | null
  }

  export type settingsCreateOrConnectWithoutUserInput = {
    where: settingsWhereUniqueInput
    create: XOR<settingsCreateWithoutUserInput, settingsUncheckedCreateWithoutUserInput>
  }

  export type settingsCreateManyUserInputEnvelope = {
    data: settingsCreateManyUserInput | settingsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RoleUpsertWithoutUserInput = {
    update: XOR<RoleUpdateWithoutUserInput, RoleUncheckedUpdateWithoutUserInput>
    create: XOR<RoleCreateWithoutUserInput, RoleUncheckedCreateWithoutUserInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutUserInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutUserInput, RoleUncheckedUpdateWithoutUserInput>
  }

  export type RoleUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    COMPCODE?: StringFieldUpdateOperationsInput | string
    active?: StringFieldUpdateOperationsInput | string
    defaultRole?: BoolFieldUpdateOperationsInput | boolean
    RoleOnPage?: RoleOnPageUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    COMPCODE?: StringFieldUpdateOperationsInput | string
    active?: StringFieldUpdateOperationsInput | string
    defaultRole?: BoolFieldUpdateOperationsInput | boolean
    RoleOnPage?: RoleOnPageUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type CompanyCodeUpsertWithWhereUniqueWithoutUserInput = {
    where: CompanyCodeWhereUniqueInput
    update: XOR<CompanyCodeUpdateWithoutUserInput, CompanyCodeUncheckedUpdateWithoutUserInput>
    create: XOR<CompanyCodeCreateWithoutUserInput, CompanyCodeUncheckedCreateWithoutUserInput>
  }

  export type CompanyCodeUpdateWithWhereUniqueWithoutUserInput = {
    where: CompanyCodeWhereUniqueInput
    data: XOR<CompanyCodeUpdateWithoutUserInput, CompanyCodeUncheckedUpdateWithoutUserInput>
  }

  export type CompanyCodeUpdateManyWithWhereWithoutUserInput = {
    where: CompanyCodeScalarWhereInput
    data: XOR<CompanyCodeUpdateManyMutationInput, CompanyCodeUncheckedUpdateManyWithoutUserInput>
  }

  export type CompanyCodeScalarWhereInput = {
    AND?: CompanyCodeScalarWhereInput | CompanyCodeScalarWhereInput[]
    OR?: CompanyCodeScalarWhereInput[]
    NOT?: CompanyCodeScalarWhereInput | CompanyCodeScalarWhereInput[]
    id?: IntFilter<"CompanyCode"> | number
    Idcard?: StringFilter<"CompanyCode"> | string
    companyCode?: StringFilter<"CompanyCode"> | string
    GCOMP?: StringNullableFilter<"CompanyCode"> | string | null
    companyid?: StringFilter<"CompanyCode"> | string
  }

  export type settingsUpsertWithWhereUniqueWithoutUserInput = {
    where: settingsWhereUniqueInput
    update: XOR<settingsUpdateWithoutUserInput, settingsUncheckedUpdateWithoutUserInput>
    create: XOR<settingsCreateWithoutUserInput, settingsUncheckedCreateWithoutUserInput>
  }

  export type settingsUpdateWithWhereUniqueWithoutUserInput = {
    where: settingsWhereUniqueInput
    data: XOR<settingsUpdateWithoutUserInput, settingsUncheckedUpdateWithoutUserInput>
  }

  export type settingsUpdateManyWithWhereWithoutUserInput = {
    where: settingsScalarWhereInput
    data: XOR<settingsUpdateManyMutationInput, settingsUncheckedUpdateManyWithoutUserInput>
  }

  export type settingsScalarWhereInput = {
    AND?: settingsScalarWhereInput | settingsScalarWhereInput[]
    OR?: settingsScalarWhereInput[]
    NOT?: settingsScalarWhereInput | settingsScalarWhereInput[]
    SettingId?: IntFilter<"settings"> | number
    UserId?: StringFilter<"settings"> | string
    Notification?: BoolNullableFilter<"settings"> | boolean | null
    BioMatrics?: BoolNullableFilter<"settings"> | boolean | null
    COMPCODE?: StringNullableFilter<"settings"> | string | null
  }

  export type UserCreateWithoutCompaniesInput = {
    username: string
    pic?: string | null
    email?: string | null
    otpemail?: string | null
    approval?: string
    password?: string | null
    Idcard?: string | null
    otp?: string | null
    hod?: string | null
    hr?: string | null
    level?: string
    verificationOtp?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string | null
    active?: boolean
    employeeId?: number | null
    isAllParty?: boolean
    isAdmin?: boolean
    fcm?: string | null
    role?: RoleCreateNestedOneWithoutUserInput
    settings?: settingsCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCompaniesInput = {
    id?: number
    username: string
    pic?: string | null
    email?: string | null
    otpemail?: string | null
    approval?: string
    password?: string | null
    Idcard?: string | null
    roleId?: string | null
    otp?: string | null
    hod?: string | null
    hr?: string | null
    level?: string
    verificationOtp?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string | null
    active?: boolean
    employeeId?: number | null
    isAllParty?: boolean
    isAdmin?: boolean
    fcm?: string | null
    settings?: settingsUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCompaniesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCompaniesInput, UserUncheckedCreateWithoutCompaniesInput>
  }

  export type UserUpsertWithoutCompaniesInput = {
    update: XOR<UserUpdateWithoutCompaniesInput, UserUncheckedUpdateWithoutCompaniesInput>
    create: XOR<UserCreateWithoutCompaniesInput, UserUncheckedCreateWithoutCompaniesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCompaniesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCompaniesInput, UserUncheckedUpdateWithoutCompaniesInput>
  }

  export type UserUpdateWithoutCompaniesInput = {
    username?: StringFieldUpdateOperationsInput | string
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    otpemail?: NullableStringFieldUpdateOperationsInput | string | null
    approval?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    Idcard?: NullableStringFieldUpdateOperationsInput | string | null
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    hod?: NullableStringFieldUpdateOperationsInput | string | null
    hr?: NullableStringFieldUpdateOperationsInput | string | null
    level?: StringFieldUpdateOperationsInput | string
    verificationOtp?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    employeeId?: NullableIntFieldUpdateOperationsInput | number | null
    isAllParty?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    fcm?: NullableStringFieldUpdateOperationsInput | string | null
    role?: RoleUpdateOneWithoutUserNestedInput
    settings?: settingsUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCompaniesInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    otpemail?: NullableStringFieldUpdateOperationsInput | string | null
    approval?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    Idcard?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    hod?: NullableStringFieldUpdateOperationsInput | string | null
    hr?: NullableStringFieldUpdateOperationsInput | string | null
    level?: StringFieldUpdateOperationsInput | string
    verificationOtp?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    employeeId?: NullableIntFieldUpdateOperationsInput | number | null
    isAllParty?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    fcm?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: settingsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutRoleInput = {
    username: string
    pic?: string | null
    email?: string | null
    otpemail?: string | null
    approval?: string
    password?: string | null
    Idcard?: string | null
    otp?: string | null
    hod?: string | null
    hr?: string | null
    level?: string
    verificationOtp?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string | null
    active?: boolean
    employeeId?: number | null
    isAllParty?: boolean
    isAdmin?: boolean
    fcm?: string | null
    Companies?: CompanyCodeCreateNestedManyWithoutUserInput
    settings?: settingsCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRoleInput = {
    id?: number
    username: string
    pic?: string | null
    email?: string | null
    otpemail?: string | null
    approval?: string
    password?: string | null
    Idcard?: string | null
    otp?: string | null
    hod?: string | null
    hr?: string | null
    level?: string
    verificationOtp?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string | null
    active?: boolean
    employeeId?: number | null
    isAllParty?: boolean
    isAdmin?: boolean
    fcm?: string | null
    Companies?: CompanyCodeUncheckedCreateNestedManyWithoutUserInput
    settings?: settingsUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRoleInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput>
  }

  export type UserCreateManyRoleInputEnvelope = {
    data: UserCreateManyRoleInput | UserCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type RoleOnPageCreateWithoutRoleInput = {
    roleId?: number | null
    read?: boolean
    create?: boolean
    edit?: boolean
    link: string
    delete?: boolean
    isdefault?: boolean
  }

  export type RoleOnPageUncheckedCreateWithoutRoleInput = {
    id?: number
    roleId?: number | null
    read?: boolean
    create?: boolean
    edit?: boolean
    link: string
    delete?: boolean
    isdefault?: boolean
  }

  export type RoleOnPageCreateOrConnectWithoutRoleInput = {
    where: RoleOnPageWhereUniqueInput
    create: XOR<RoleOnPageCreateWithoutRoleInput, RoleOnPageUncheckedCreateWithoutRoleInput>
  }

  export type RoleOnPageCreateManyRoleInputEnvelope = {
    data: RoleOnPageCreateManyRoleInput | RoleOnPageCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutRoleInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutRoleInput, UserUncheckedUpdateWithoutRoleInput>
    create: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput>
  }

  export type UserUpdateWithWhereUniqueWithoutRoleInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutRoleInput, UserUncheckedUpdateWithoutRoleInput>
  }

  export type UserUpdateManyWithWhereWithoutRoleInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutRoleInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: IntFilter<"User"> | number
    username?: StringFilter<"User"> | string
    pic?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    otpemail?: StringNullableFilter<"User"> | string | null
    approval?: StringFilter<"User"> | string
    password?: StringNullableFilter<"User"> | string | null
    Idcard?: StringNullableFilter<"User"> | string | null
    roleId?: StringNullableFilter<"User"> | string | null
    otp?: StringNullableFilter<"User"> | string | null
    hod?: StringNullableFilter<"User"> | string | null
    hr?: StringNullableFilter<"User"> | string | null
    level?: StringFilter<"User"> | string
    verificationOtp?: StringNullableFilter<"User"> | string | null
    expiresAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeNullableFilter<"User"> | Date | string | null
    active?: BoolFilter<"User"> | boolean
    employeeId?: IntNullableFilter<"User"> | number | null
    isAllParty?: BoolFilter<"User"> | boolean
    isAdmin?: BoolFilter<"User"> | boolean
    fcm?: StringNullableFilter<"User"> | string | null
  }

  export type RoleOnPageUpsertWithWhereUniqueWithoutRoleInput = {
    where: RoleOnPageWhereUniqueInput
    update: XOR<RoleOnPageUpdateWithoutRoleInput, RoleOnPageUncheckedUpdateWithoutRoleInput>
    create: XOR<RoleOnPageCreateWithoutRoleInput, RoleOnPageUncheckedCreateWithoutRoleInput>
  }

  export type RoleOnPageUpdateWithWhereUniqueWithoutRoleInput = {
    where: RoleOnPageWhereUniqueInput
    data: XOR<RoleOnPageUpdateWithoutRoleInput, RoleOnPageUncheckedUpdateWithoutRoleInput>
  }

  export type RoleOnPageUpdateManyWithWhereWithoutRoleInput = {
    where: RoleOnPageScalarWhereInput
    data: XOR<RoleOnPageUpdateManyMutationInput, RoleOnPageUncheckedUpdateManyWithoutRoleInput>
  }

  export type RoleOnPageScalarWhereInput = {
    AND?: RoleOnPageScalarWhereInput | RoleOnPageScalarWhereInput[]
    OR?: RoleOnPageScalarWhereInput[]
    NOT?: RoleOnPageScalarWhereInput | RoleOnPageScalarWhereInput[]
    id?: IntFilter<"RoleOnPage"> | number
    roleId?: IntNullableFilter<"RoleOnPage"> | number | null
    roleName?: StringFilter<"RoleOnPage"> | string
    read?: BoolFilter<"RoleOnPage"> | boolean
    create?: BoolFilter<"RoleOnPage"> | boolean
    edit?: BoolFilter<"RoleOnPage"> | boolean
    link?: StringFilter<"RoleOnPage"> | string
    delete?: BoolFilter<"RoleOnPage"> | boolean
    isdefault?: BoolFilter<"RoleOnPage"> | boolean
  }

  export type RoleCreateWithoutRoleOnPageInput = {
    name: string
    COMPCODE?: string
    active?: string
    defaultRole?: boolean
    User?: UserCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateWithoutRoleOnPageInput = {
    id?: number
    name: string
    COMPCODE?: string
    active?: string
    defaultRole?: boolean
    User?: UserUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleCreateOrConnectWithoutRoleOnPageInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutRoleOnPageInput, RoleUncheckedCreateWithoutRoleOnPageInput>
  }

  export type RoleUpsertWithoutRoleOnPageInput = {
    update: XOR<RoleUpdateWithoutRoleOnPageInput, RoleUncheckedUpdateWithoutRoleOnPageInput>
    create: XOR<RoleCreateWithoutRoleOnPageInput, RoleUncheckedCreateWithoutRoleOnPageInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutRoleOnPageInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutRoleOnPageInput, RoleUncheckedUpdateWithoutRoleOnPageInput>
  }

  export type RoleUpdateWithoutRoleOnPageInput = {
    name?: StringFieldUpdateOperationsInput | string
    COMPCODE?: StringFieldUpdateOperationsInput | string
    active?: StringFieldUpdateOperationsInput | string
    defaultRole?: BoolFieldUpdateOperationsInput | boolean
    User?: UserUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateWithoutRoleOnPageInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    COMPCODE?: StringFieldUpdateOperationsInput | string
    active?: StringFieldUpdateOperationsInput | string
    defaultRole?: BoolFieldUpdateOperationsInput | boolean
    User?: UserUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type CompanyCodeCreateManyUserInput = {
    id?: number
    companyCode: string
    GCOMP?: string | null
    companyid: string
  }

  export type settingsCreateManyUserInput = {
    SettingId?: number
    Notification?: boolean | null
    BioMatrics?: boolean | null
    COMPCODE?: string | null
  }

  export type CompanyCodeUpdateWithoutUserInput = {
    companyCode?: StringFieldUpdateOperationsInput | string
    GCOMP?: NullableStringFieldUpdateOperationsInput | string | null
    companyid?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyCodeUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyCode?: StringFieldUpdateOperationsInput | string
    GCOMP?: NullableStringFieldUpdateOperationsInput | string | null
    companyid?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyCodeUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    companyCode?: StringFieldUpdateOperationsInput | string
    GCOMP?: NullableStringFieldUpdateOperationsInput | string | null
    companyid?: StringFieldUpdateOperationsInput | string
  }

  export type settingsUpdateWithoutUserInput = {
    Notification?: NullableBoolFieldUpdateOperationsInput | boolean | null
    BioMatrics?: NullableBoolFieldUpdateOperationsInput | boolean | null
    COMPCODE?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type settingsUncheckedUpdateWithoutUserInput = {
    SettingId?: IntFieldUpdateOperationsInput | number
    Notification?: NullableBoolFieldUpdateOperationsInput | boolean | null
    BioMatrics?: NullableBoolFieldUpdateOperationsInput | boolean | null
    COMPCODE?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type settingsUncheckedUpdateManyWithoutUserInput = {
    SettingId?: IntFieldUpdateOperationsInput | number
    Notification?: NullableBoolFieldUpdateOperationsInput | boolean | null
    BioMatrics?: NullableBoolFieldUpdateOperationsInput | boolean | null
    COMPCODE?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateManyRoleInput = {
    id?: number
    username: string
    pic?: string | null
    email?: string | null
    otpemail?: string | null
    approval?: string
    password?: string | null
    Idcard?: string | null
    otp?: string | null
    hod?: string | null
    hr?: string | null
    level?: string
    verificationOtp?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string | null
    active?: boolean
    employeeId?: number | null
    isAllParty?: boolean
    isAdmin?: boolean
    fcm?: string | null
  }

  export type RoleOnPageCreateManyRoleInput = {
    id?: number
    roleId?: number | null
    read?: boolean
    create?: boolean
    edit?: boolean
    link: string
    delete?: boolean
    isdefault?: boolean
  }

  export type UserUpdateWithoutRoleInput = {
    username?: StringFieldUpdateOperationsInput | string
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    otpemail?: NullableStringFieldUpdateOperationsInput | string | null
    approval?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    Idcard?: NullableStringFieldUpdateOperationsInput | string | null
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    hod?: NullableStringFieldUpdateOperationsInput | string | null
    hr?: NullableStringFieldUpdateOperationsInput | string | null
    level?: StringFieldUpdateOperationsInput | string
    verificationOtp?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    employeeId?: NullableIntFieldUpdateOperationsInput | number | null
    isAllParty?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    fcm?: NullableStringFieldUpdateOperationsInput | string | null
    Companies?: CompanyCodeUpdateManyWithoutUserNestedInput
    settings?: settingsUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRoleInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    otpemail?: NullableStringFieldUpdateOperationsInput | string | null
    approval?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    Idcard?: NullableStringFieldUpdateOperationsInput | string | null
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    hod?: NullableStringFieldUpdateOperationsInput | string | null
    hr?: NullableStringFieldUpdateOperationsInput | string | null
    level?: StringFieldUpdateOperationsInput | string
    verificationOtp?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    employeeId?: NullableIntFieldUpdateOperationsInput | number | null
    isAllParty?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    fcm?: NullableStringFieldUpdateOperationsInput | string | null
    Companies?: CompanyCodeUncheckedUpdateManyWithoutUserNestedInput
    settings?: settingsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutRoleInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    otpemail?: NullableStringFieldUpdateOperationsInput | string | null
    approval?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    Idcard?: NullableStringFieldUpdateOperationsInput | string | null
    otp?: NullableStringFieldUpdateOperationsInput | string | null
    hod?: NullableStringFieldUpdateOperationsInput | string | null
    hr?: NullableStringFieldUpdateOperationsInput | string | null
    level?: StringFieldUpdateOperationsInput | string
    verificationOtp?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    employeeId?: NullableIntFieldUpdateOperationsInput | number | null
    isAllParty?: BoolFieldUpdateOperationsInput | boolean
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    fcm?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RoleOnPageUpdateWithoutRoleInput = {
    roleId?: NullableIntFieldUpdateOperationsInput | number | null
    read?: BoolFieldUpdateOperationsInput | boolean
    create?: BoolFieldUpdateOperationsInput | boolean
    edit?: BoolFieldUpdateOperationsInput | boolean
    link?: StringFieldUpdateOperationsInput | string
    delete?: BoolFieldUpdateOperationsInput | boolean
    isdefault?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RoleOnPageUncheckedUpdateWithoutRoleInput = {
    id?: IntFieldUpdateOperationsInput | number
    roleId?: NullableIntFieldUpdateOperationsInput | number | null
    read?: BoolFieldUpdateOperationsInput | boolean
    create?: BoolFieldUpdateOperationsInput | boolean
    edit?: BoolFieldUpdateOperationsInput | boolean
    link?: StringFieldUpdateOperationsInput | string
    delete?: BoolFieldUpdateOperationsInput | boolean
    isdefault?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RoleOnPageUncheckedUpdateManyWithoutRoleInput = {
    id?: IntFieldUpdateOperationsInput | number
    roleId?: NullableIntFieldUpdateOperationsInput | number | null
    read?: BoolFieldUpdateOperationsInput | boolean
    create?: BoolFieldUpdateOperationsInput | boolean
    edit?: BoolFieldUpdateOperationsInput | boolean
    link?: StringFieldUpdateOperationsInput | string
    delete?: BoolFieldUpdateOperationsInput | boolean
    isdefault?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}