/**
 * @description
 * middleware is called by resolvers.
 * so that all resolvers become one argument.
 * and middleware also is resolver.
 * what happens, middleware is called with parent, argument, context.
 * if middleware finds request of a user, call function which gives us an argument.
 */

/**
 * we call it with
 * @param {function} resolverFunction
 *
 * and graphql re-call it with those parameters.
 */
const privateResolver = (resolverFunction) => async (
  parent,
  argument,
  context,
  info
) => {
  if (!context.req.user) {
    // if user not exist
    throw new Error("No JWT. I refuse to proceed.");
  }

  const resolved = await resolverFunction(parent, argument, context, info);

  return resolved;
};

export default privateResolver;
