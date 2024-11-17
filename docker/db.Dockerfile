FROM postgres:17

COPY --chown=postgres:postgres ./postgresql.conf /etc/postgresql/postgresql.conf

RUN mkdir -p /var/lib/postgresql/logs \
    && chown postgres:postgres /var/lib/postgresql/logs

EXPOSE 5432

CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]
