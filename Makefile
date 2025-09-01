.PHONY: clean
clean:
	npm run clear

.PHONY: dev
dev:
	# runs docusaurus start, which is dev mode, i.e., process.env.NODE_ENV === 'development'
	npm run start

.PHONY: build
build:
	# runs docusaurus build, which is prod mode, i.e., process.env.NODE_ENV === 'production'
	npm run build

.PHONY: deploy
deploy: clean build
	git add .
	git commit -m 'deploy'
	git push
