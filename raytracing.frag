#version 460
#define EPSILON = 0.001
#define BIG = 1000000.0
const int DIFFUSE = 1;
const int REFLECTION = 2;
const int REFRACTION = 3;

out vec4 FragColor;
in vec3 glPosition;

struct SCamera
{
	vec3 Position;
	vec3 View;
	vec3 Up;
	vec3 Side;
	vec2 Scale;
};

struct SRay
{
	vec3 Origin;
	vec3 Direction;
};

struct SSphere
{
	vec3 Center;
	float Radius;
	int MaterialIdx;
};

struct STriangle
{
	vec3 v1;
	vec3 v2;
	vec3 v3;
	int MaterialIdx;
};

SRay GenerateRay(SCamera uCamera)
{
	vec2 coords = glPosition.xy * uCamera.Scale;
	vec3 direction = uCamera.View + uCamera.Side * coords.x + uCamera.Up * coords.y;
	return SRay(uCamera.Position, normalize(direction));
}

SCamera initializeDefaultCamera()
{
	//** CAMERA **//
	SCamera camera;
	camera.Position = vec3(0.0, 0.0, -8.0);
	camera.View = vec3(0.0, 0.0, 1.0);
	camera.Up = vec3(0.0, 1.0, 0.0);
	camera.Side = vec3(1.0, 0.0, 0.0);
	camera.Scale = vec2(1.0);
	return camera;
}

STriangle triangles[12];
SSphere spheres[2];

void initializeDefaultScene()
{
	/** TRIANGLES **/
	/* left wall */
	triangles[0].v1 = vec3(-5.0,-5.0,-5.0);
	triangles[0].v2 = vec3(-5.0, 5.0, 5.0);
	triangles[0].v3 = vec3(-5.0, 5.0,-5.0);
	triangles[0].MaterialIdx = 0;
	triangles[1].v1 = vec3(-5.0,-5.0,-5.0);
	triangles[1].v2 = vec3(-5.0,-5.0, 5.0);
	triangles[1].v3 = vec3(-5.0, 5.0, 5.0);
	triangles[1].MaterialIdx = 0;

	triangles[2].v1 = vec3(-5.0,-5.0, 5.0);
	triangles[2].v2 = vec3( 5.0,-5.0, 5.0);
	triangles[2].v3 = vec3(-5.0, 5.0, 5.0);
	triangles[2].MaterialIdx = 0;
	triangles[3].v1 = vec3( 5.0, 5.0, 5.0);
	triangles[3].v2 = vec3(-5.0, 5.0, 5.0);
	triangles[3].v3 = vec3( 5.0,-5.0, 5.0);
	triangles[3].MaterialIdx = 0;
	
	/*right wall */ 
	triangles[4].v1 = vec3(5.0, 5.0, 5.0); 
	triangles[4].v2 = vec3(5.0, -5.0, 5.0); 
	triangles[4].v3 = vec3(5.0, 5.0, -5.0); 
	triangles[4].MaterialIdx = 0; 
	triangles[5].v1 = vec3(5.0, 5.0, -5.0); 
	triangles[5].v2 = vec3(5.0, -5.0, 5.0); 
	triangles[5].v3 = vec3(5.0, -5.0, -5.0); 
	triangles[5].MaterialIdx = 0; 

	/*down wall */ 
	triangles[6].v1 = vec3(-5.0,-5.0, 5.0); 
	triangles[6].v2 = vec3(-5.0,-5.0,-5.0); 
	triangles[6].v3 = vec3( 5.0,-5.0, 5.0); 
	triangles[6].MaterialIdx = 0; 
	triangles[7].v1 = vec3(5.0, -5.0, -5.0); 
	triangles[7].v2 = vec3(5.0,-5.0, 5.0); 
	triangles[7].v3 = vec3(-5.0,-5.0,-5.0); 
	triangles[7].MaterialIdx = 0; 

	/*up wall */ 
	triangles[8].v1 = vec3(-5.0, 5.0,-5.0); 
	triangles[8].v2 = vec3(-5.0, 5.0, 5.0); 
	triangles[8].v3 = vec3( 5.0, 5.0, 5.0); 
	triangles[8].MaterialIdx = 0; 
	triangles[9].v1 = vec3(-5.0, 5.0, -5.0); 
	triangles[9].v2 = vec3( 5.0, 5.0, 5.0); 
	triangles[9].v3 = vec3(5.0, 5.0, -5.0); 
	triangles[9].MaterialIdx = 0; 

	/*front wall*/ 
	triangles[10].v1 = vec3(-5.0,-5.0, -5.0); 
	triangles[10].v2 = vec3( 5.0,-5.0, -5.0); 
	triangles[10].v3 = vec3(-5.0, 5.0, -5.0); 
	triangles[10].MaterialIdx = 0; 
	triangles[11].v1 = vec3( 5.0, 5.0, -5.0); 
	triangles[11].v2 = vec3(-5.0, 5.0, -5.0); 
	triangles[11].v3 = vec3( 5.0,-5.0, -5.0); 
	triangles[11].MaterialIdx = 0; 
	

	/** SPHERES **/
	spheres[0].Center = vec3(-1.0, -1.0, -2.0);
	spheres[0].Radius = 2.0;
	spheres[0].MaterialIdx = 0;
	spheres[1].Center = vec3(2.0, 1.0, 2.0);
	spheres[1].Radius = 1.0;
	spheres[1].MaterialIdx = 0;
}

void main(void )
{
	SCamera uCamera = initializeDefaultCamera();
	SRay ray = GenerateRay(uCamera);
	vec3 resultColor = vec3(0, 0, 0);
	FragColor = vec4(abs(ray.Direction.xy), 0, 1.0);
	initializeDefaultScene();
}































































