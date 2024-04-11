class GenericMapper {
  toClass<DTO extends object, ENTITY extends object>(
    dto: DTO,
    entity: ENTITY,
  ): ENTITY {
    let response = entity;
    Object.keys(dto).forEach((k) => {
      if (Object.keys(entity).includes(k)) {
        response = { ...response, [k]: dto[k] };
      }
      if (Object.keys(entity).includes(`_${k}`)) {
        response = { ...response, [k]: dto[k] };
      }
    });
    return response;
  }
}

export default new GenericMapper();